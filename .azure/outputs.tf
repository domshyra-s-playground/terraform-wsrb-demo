output "resource_group_name" {
  value = module.resource_group.name
}

output "subnets_lookup_ids" {
  value = module.subnets_lookup.subnet_ids
}

output "app_service_plan_name" {
  value = module.app_service_plan.name
}


# web
output "app_insights_web_connection_string" {
  value     = module.monitoring.app_insights_secrets.web.connection_string
  sensitive = true
}

output "app_service_web_name" {
  value = module.app_service_web.name
}

output "app_service_web_default_hostname" {
  value = module.app_service_web.default_hostname
}

# needed to run migration script after deployment in Replace tokens in appsettings.Production.json
output "app_service_web_url" {
  value = module.app_service_web.https_url
}

output "app_service_web_certificate_secret_uri" {
  value = module.app_service_web.certificate_secret_uri
}


# Example of a TF Output used from ymal
output "site_incrementor_value" {
  value = 12
}
