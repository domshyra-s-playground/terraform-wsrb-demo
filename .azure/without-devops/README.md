# Running terraform for azure

[install terraform](https://developer.hashicorp.com/terraform/install)
[install az cli](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)

# Setting up cli credentials

## Setting up Azure CLI Credentials

https://developer.hashicorp.com/terraform/tutorials/azure-get-started/azure-build

once you have done this take those credentials from the `az ad sp create-for-rbac` and put them in your azure key vault using this format.

```json
client_id="<APPID_VALUE>"
subscription_id="<SUBSCRIPTION_ID>"
client_secret="<PASSWORD_VALUE>"
tenant_id="<TENANT_ID>"
```

there are more configs in the `.env` file that you can use to set up your environment variables. use `env.local` if using the shell scripts to run the terraform commands.

### TF STATE add before running terraform init

#### if this is the first time then run these 

```bash
RESOURCE_GROUP_NAME=rg-tfstate
STORAGE_ACCOUNT_NAME=sadomshyratfstates (or your unique name globally across azure)

# Create resource group
az group create --name $RESOURCE_GROUP_NAME --location westus2

# Create storage account
az storage account create --resource-group $RESOURCE_GROUP_NAME --name $STORAGE_ACCOUNT_NAME --sku Standard_LRS --encryption-services blob
```

#### Run this to create the container for the tfstate

```bash
STORAGE_ACCOUNT_NAME=terraform-states
CONTAINER_NAME=tf-wsrb-demo-tfstate
# Create blob container
az storage container create --name $CONTAINER_NAME --account-name $STORAGE_ACCOUNT_NAME
```

## Steps to Run Terraform

1. **Initialize Terraform**

    ```bash
    # .azure/
    terraform init
    ```

    This command initializes the Terraform working directory and downloads the necessary provider plugins.

2. **Validate the Configuration**

    ```bash
    # .azure/
    source local.sh && terraform validate
    ```

    This command validates the Terraform files for syntax and internal consistency, ensuring the configuration is ready to be applied.

3. **Plan the Infrastructure**

    ```bash
    # .azure/
    source local.sh && terraform plan
    ```

    This command creates an execution plan, showing what actions Terraform will take to achieve the desired state.

4. **Apply the Configuration**

    ```bash
    # .azure/
    source local.sh && terraform apply
    ```

    This command applies the changes required to reach the desired state of the configuration. You will be prompted to confirm before proceeding.

5. **Verify the Deployment**
   After applying, you can verify the resources in the Azure portal or by using the Azure CLI:

    ```bash
    # .azure/
    az resource list --output table
    ```

6. **Destroy the Infrastructure (if needed)** NOTE do this before making changes
    ```bash
    # .azure/
    source local.sh && terraform destroy
    ```
    This command destroys the resources created by Terraform. Use this with caution.

# Terraform Commands

| Command              | Description                                                                   |
| -------------------- | ----------------------------------------------------------------------------- |
| `terraform init`     | Initializes the Terraform working directory.                                  |
| `terraform validate` | Validates the Terraform configuration files.                                  |
| `terraform plan`     | Creates an execution plan, showing what actions Terraform will take.          |
| `terraform apply`    | Applies the changes required to reach the desired state of the configuration. |
| `terraform destroy`  | Destroys the resources created by Terraform.                                  |
| `terraform output`   | Displays the output values from the Terraform state.                          |
| `terraform fmt`      | Formats the Terraform configuration files to a canonical format.              |

# Notes here is a vscode extension to help with terraform

-   [Terraform for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=HashiCorp.terraform)

# Bash commands to help with terraform

-   apply and load the variables

```bash
# .azure/
source apply.sh
```

-   destroy and load the variables

```bash
# .azure/
source destroy.sh
```

# VScode can run the terraform validate and plan commands with creds

-   debug and use `terraform`


# GOdday trouble shooting 

might have to run if c_name errors out

`terraform import godaddy-dns_record.c_name repo-name.com:CNAME:www:;repo-name.azurewebsites.net`


#### azurerm_key_vault plan error
Error: retrieving `contact` for KeyVault: keyvault.BaseClient#GetCertificateContacts: Failure responding to request: StatusCode=401 -- Original Error: autorest/azure: Service returned an error. Status=401 Code="Unauthorized" Message="AKV10046: Unable to resolve the key used for signature validation. EncodedJwtHeader: '***'."
│ 
│   with azurerm_key_vault.

make sure the ![key-vault-error](../key-vault-error.png)
![alt text](../officer.png)