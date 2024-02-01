terraform {
  backend "s3" {
    # account_id = < Managed by https://ipdx.co >
    region               = "us-east-1"
    bucket               = "github-as-code-interplanetary-shipyard"
    key                  = "terraform.tfstate"
    workspace_key_prefix = "org"
    dynamodb_table       = "github-as-code-interplanetary-shipyard"
  }
}
