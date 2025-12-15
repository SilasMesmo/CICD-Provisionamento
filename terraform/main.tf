module "vpc"{
  source = "./modules/vpc"
  project_id = var.project_id
}

module "cluster"{
  source = "./modules/cluster"
  project_id = var.project_id
  network = module.vpc.network
  subnet = module.vpc.subnet

  depends_on = [module.vpc]
}