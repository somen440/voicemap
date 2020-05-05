resource "google_cloudbuild_trigger" "build" {
  name        = "build-trigger"
  description = "Build Container Image"

  trigger_template {
    branch_name = "master"
    repo_name   = "github_somen440_voicemap"
  }

  filename = "deploy/cloudbuild.yaml"
}
