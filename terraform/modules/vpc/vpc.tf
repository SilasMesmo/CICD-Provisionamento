resource "google_compute_network" "vpc" {
  project                 = var.project_id
  name                    = "vpc-silas"
  auto_create_subnetworks = false
  mtu                     = 1460
}

resource "google_compute_subnetwork" "subnet" {
  name          = "silas-subnet"
  project       = var.project_id
  ip_cidr_range = "10.100.0.0/24"  # IPs (Nodes)
  region        = "us-central1"
  network       = google_compute_network.vpc.id

  # Faixa para os PODS
  secondary_ip_range {
    range_name    = "pods-range"
    ip_cidr_range = "10.4.0.0/16"
  }

  # Faixa para os SERVICES (ClusterIPs)
  secondary_ip_range {
    range_name    = "services-range"
    ip_cidr_range = "10.0.32.0/20"
  }
}

# Permitir comunicação interna
resource "google_compute_firewall" "allow_internal" {
  name    = "allow-internal-silas"
  network = google_compute_network.vpc.name

  allow {
    protocol = "icmp"
  }

  allow {
    protocol = "tcp"
    ports    = ["0-65535"]
  }

  allow {
    protocol = "udp"
    ports    = ["0-65535"]
  }

  source_ranges = [google_compute_subnetwork.subnet.ip_cidr_range]
}


resource "google_compute_firewall" "allow_ssh" {
  name    = "allow-ssh-silas"
  network = google_compute_network.vpc.name

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  source_ranges = ["35.235.240.0/20"] 
}

# permite checagem de saúde dos nodes
resource "google_compute_firewall" "allow_health_check" {
  name    = "allow-health-check-silas"
  network = google_compute_network.vpc.name

  allow {
    protocol = "tcp"
  }

  # IPs do Google que fazem a checagem de saúde
  source_ranges = ["35.191.0.0/16", "130.211.0.0/22"]
}