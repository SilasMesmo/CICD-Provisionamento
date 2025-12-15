terraform {
  required_version = ">= 1.5" # maior ou igual 1.5

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }

  backend "gcs" {
    bucket  = "silas-tfstate-cicd"
    prefix  = "terraform/state"
  }

}

provider "google" {
  project     = var.project_id
  region      = "us-central1"
}