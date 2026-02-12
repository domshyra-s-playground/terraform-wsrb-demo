#region Providers and Locals
provider "azurerm" {
  subscription_id = var.subscription_id
  features {}
}

locals {
  tags = {
    Environment = var.environment
  }
}

provider "azurerm" {
  alias = "infra"
  features {}
  subscription_id = var.hub_subscription_id
}
#endregion Providers and Locals

#region Lookup Modules
module "managed_identity_lookup" {
  source              = "@Identity/UserAssignedIdentity/Lookup"
  name                = var.managed_identity_name
  resource_group_name = var.managed_identity_resource_group_name
}

module "subnets_lookup" {
  source               = "@Networking/Subnet/Lookup"
  subnet_names         = [var.SubnetNameWeb, var.SubnetNameApi, var.SubnetNamePe]
  virtual_network_name = var.vnet_name
  resource_group_name  = var.resource_group_name
}

module "private_dns_zone_lookup" {
  source                               = "@Networking/DNS/PrivateZone/Lookup"
  subscription_id                      = var.hub_subscription_id
  private_dns_zone_resource_group_name = var.hub_resource_group_name
}
#endregion Lookup Modules

#region Core Modules
//Note: we cannot use variables for the source name
module "naming" {
  source      = "@Core/Naming/Main"
  location    = var.location
  purpose     = var.purpose
  environment = var.environment
}

// Resource Group
module "resource_group" {
  source   = "@Core/ResourceGroup/Main"
  location = var.location
  name     = module.naming.resource_group_name
  tags     = local.tags
}

#endregion Core Modules

#region Application Insights
# this creates the workspace, web and api insights and alerts
module "monitoring" {
  source                           = "@CompositeModules/ApplicationInsightsWithMonitoring/Main"
  location                         = var.location
  purpose                          = var.purpose
  environment                      = var.environment
  resource_group_name              = module.resource_group.name # Resource group name where resources will be created
  create_app_insights_api          = true
  create_app_insights_web          = true
  action_group_name                = var.shared_action_group_name
  action_group_resource_group_name = var.shared_resource_group_name
  tags                             = local.tags
}

#endregion Application Insights

#region App Service Plan
module "app_service_plan" {
  source              = "@ApplicationPlatform/Web/AppService/Plan/Main"
  name                = module.naming.app_service_names.plan
  location            = var.location
  resource_group_name = module.resource_group.name
  sku_name            = var.AppServicePlanSkuName
  os_type             = "Windows"
  tags                = local.tags
}
#endregion App Service Plan

#region App Service Web
module "app_service_web" {
  source = "@CompositeModules/AppServiceWithCustomDomain/Main"

  environment     = var.environment
  location        = var.location
  purpose         = var.purpose
  subscription_id = var.subscription_id

  name                = module.naming.app_service_names.web
  resource_group_name = module.resource_group.name
  service_plan_id     = module.app_service_plan.id
  identity_type       = "UserAssigned"
  identity_ids        = [module.managed_identity_lookup.id]

  app_settings = {
    # Core App Configuration
    "AZURE_CLIENT_ID"                = module.managed_identity_lookup.client_id                       # Client ID for user-assigned managed identity
    "APPINSIGHTS_INSTRUMENTATIONKEY" = module.monitoring.app_insights_secrets.api.instrumentation_key # Legacy Application Insights key (for compatibility)

    # Application Insights Configuration
    "APPLICATIONINSIGHTS_CONNECTION_STRING"      = module.monitoring.app_insights_secrets.api.connection_string
    "ApplicationInsightsAgent_EXTENSION_VERSION" = "~3"                                       # Enables built-in App Insights agent (auto-injection)
    "APPINSIGHTS_PROFILER_FEATURE_VERSION"       = var.appServices.appInsightsProfilerVersion # Enables performance profiling
    "APPINSIGHTS_SNAPSHOTFEATURE_VERSION"        = var.appServices.appInsightsSnapshotVersion # Enables snapshot debugger for exceptions
    "WEBSITE_NODE_DEFAULT_VERSION"               = "~${var.appServices.nodeVersion}"          # Default Node.js version to use

    "XDT_MicrosoftApplicationInsights_NodeJS" = "1" # Enables App Insights for Node.js (Node runtime auto-instrumentation)
  }
  # Runtime 
  current_stack = "node"
  node_version  = "~${var.appServices.nodeVersion}"
  physical_path = "site\\wwwroot\\"

  enable_deployment_slot = true

  # enable_custom_hostname = false
  # custom_hostname_fqdn = 

  enable_vnet_integration = true
  vnet_subnet_id          = module.subnets_lookup.subnet_ids[0]

  tags = local.tags
}

#endregion App Service Web


#region private endpoints 
module "private_endpoint_web_app" {
  source                         = "@Networking/PrivateEndpoint/Main"
  private_endpoint_name          = module.naming.private_endpoint_names.app_service_web.name
  location                       = var.location
  resource_group_name            = module.resource_group.name
  subnet_id                      = module.subnets_lookup.subnet_ids[2]
  custom_network_interface_name  = module.naming.private_endpoint_names.app_service_web.nic
  private_dns_zone_group_name    = "default"
  private_dns_zone_ids           = [module.private_dns_zone_lookup.zone_ids["websites"]]
  private_connection_resource_id = module.app_service_web.id
  subresource_names              = ["sites"]
  tags                           = local.tags
}

#endregion private endpoints
