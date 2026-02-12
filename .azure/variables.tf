# AvAvailable at DevOps level AKA GLOBAL
#region Global Variables
variable "vnet_name" {
  type = string
}

variable "resource_group_name" {
  type = string
}

variable "hub_resource_group_name" {
  type = string
}

variable "hub_subscription_id" {
  type = string
}

variable "subscription_id" {
  type = string
}

variable "managed_identity_name" {
  type = string
}

variable "managed_identity_resource_group_name" {
  type = string
}

variable "shared_resource_group_name" {
  type = string
}

variable "shared_action_group_name" {
  type = string
}
#endregion

#region Devops Application Variables 
variable "location" {
  type = string
}

variable "purpose" {
  type = string
}

variable "environment" {
  type = string
}

variable "SubnetNamePe" {
  type = string
}

variable "SubnetNameApi" {
  type = string
}

variable "SubnetNameWeb" {
  type = string
}


#endregion

#region Project Specific Variables 
#? Note use camel case for all developer specific variables and snake case TF stuff 

variable "projectDetails" {
  type = object({
    name        = string
    acronym     = string
    description = string
    //TODO these might come back from the DNS later but for now we can hardcode it here
    webAppDnsName = string
    apiAppDnsName = string
    dnsNameSuffix = string
  })
  default = {
    name          = "TF Demo"
    acronym       = "tfdemo"
    description   = "Terraform demo project for WSRB"
    webAppDnsName = "tfdemoweb"
    apiAppDnsName = "tfdemoapi" # not needed for the demo tho
    dnsNameSuffix = ".wsrb.com"
  }
}

variable "SiteCounterStart" {
  type = string
}

variable "AppServicePlanSkuName" {
  type = string
}

variable "appServices" {
  description = "values for the app service"
  type = object({
    nodeVersion                = string
    dotnetVersion              = string
    appInsightsProfilerVersion = string
    appInsightsSnapshotVersion = string
    webLocalhostUrl            = string

  })
  default = {
    nodeVersion                = "20"
    dotnetVersion              = "8.0"
    appInsightsProfilerVersion = "1.0.0"
    appInsightsSnapshotVersion = "1.0.0"
    webLocalhostUrl            = "https://localhost:3000" # note this is only added for the dev env for localhost testing via api cors policy
  }
}
#endregion

