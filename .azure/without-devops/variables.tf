variable "region" {
  description = "Azure region for resources"
  type = object({
    location      = string
    long_name     = string
    cert_province = string
    cert_country  = string
    cert_locality = string
  })
  default = {
    location      = "westus2"
    long_name     = "West US 2"
    cert_province = "OR"
    cert_country  = "US"
    cert_locality = "Portland"
  }
}

variable "app_service_plan" {
  description = "values for the app service"
  type = object({
    name           = string
    resource_group = string
  })
  default = {
    name           = "asp-server-farm"
    resource_group = "rg-asp"
  }
}

variable "repo" {
  description = "repository details"
  type = object({
    name       = string
    short_name = string
  })
  default = {
    name       = "tf-wsrb-demo"
    short_name = "tf-demo" # note this can only be 11 characters
  }
}

variable "app_services" {
  description = "values for the app service"
  type = object({
    types          = list(string)
    node_version   = string
    dotnet_version = string
  })
  default = {
    types          = ["web", "api"]
    node_version   = "22"
    dotnet_version = "9.0"
  }
}
#region private variables
variable "subscription_id" {
  sensitive   = true
  description = "from .env.local"
  type        = string
}
variable "tenant_id" {
  sensitive   = true
  description = "from .env.local"
  type        = string
}
variable "godaddy_api_key" {
  sensitive   = true
  description = "from .env.local"
  type        = string
}
variable "godaddy_api_secret" {
  sensitive   = true
  description = "from .env.local"
  type        = string
}
variable "site_counter_start" {
  sensitive   = true
  description = "from .env.local"
  type        = string
}
#endregion 
