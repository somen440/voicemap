resource "google_cloud_run_service" "app" {
  name     = "voicemap-app"
  location = "asia-northeast1"

  template {
    spec {
      containers {
        image = "gcr.io/voismap/app"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_service.app.location
  project     = google_cloud_run_service.app.project
  service     = google_cloud_run_service.app.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
