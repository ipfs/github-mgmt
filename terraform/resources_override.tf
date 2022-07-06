resource "github_team" "this" {
  lifecycle {
    ignore_changes = []
  }
}

resource "github_repository" "this" {
  lifecycle {
    ignore_changes = [
      allow_auto_merge,
      allow_merge_commit,
      allow_rebase_merge,
      allow_squash_merge,
      archive_on_destroy,
      archived,
      auto_init,
      delete_branch_on_merge,
      gitignore_template,
      has_downloads,
      has_issues,
      has_projects,
      has_wiki,
      homepage_url,
      ignore_vulnerability_alerts_during_read,
      is_template,
      license_template,
      pages,
      template,
      vulnerability_alerts,
    ]
  }
}

resource "github_branch_protection" "this" {
  lifecycle {
    ignore_changes = [
      allows_deletions,
      allows_force_pushes,
      enforce_admins,
      push_restrictions,
      require_conversation_resolution,
      require_signed_commits,
      required_linear_history,
      required_pull_request_reviews,
      required_status_checks,
    ]
  }
}

resource "github_repository_file" "this" {
  lifecycle {
    ignore_changes = [
      overwrite_on_create,
    ]
  }
}
