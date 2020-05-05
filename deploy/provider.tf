provider "google" {
  credentials = file("credentials.json")
  project     = "voismap"
  region      = "asia-northeast1"
}
