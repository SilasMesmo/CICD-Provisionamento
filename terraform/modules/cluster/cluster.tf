resource "google_container_cluster" "cluster" {
  name     = "silas-cluster"
  location = "us-central1" 
  project  = var.project_id
  network    = var.network
  subnetwork = var.subnet

  ip_allocation_policy {
    cluster_secondary_range_name  = "pods-range"
    services_secondary_range_name = "services-range"
  }

  workload_identity_config {
    workload_pool = "${var.project_id}.svc.id.goog"  #svc.id.goog sufixo que permite acesso a gcp IAM
  }

  remove_default_node_pool = true
  initial_node_count       = 1
  
  # Para não travar na hora de destruir o lab
  deletion_protection = false
}

# Node Pool
resource "google_container_node_pool" "pool" {
  name       = "silas-node-pool"
  location   = "us-central1"
  cluster    = google_container_cluster.cluster.name
  project    = var.project_id
  node_count = 1

  node_config {
    machine_type = "e2-medium"
    disk_size_gb = 30
    
    #  Permissões do GCP (Artifact Registry, Logging)
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
    
    workload_metadata_config {
      mode = "GKE_METADATA" #servidor de metadados que intercepta token gerado pelo pod
    }
  }
}