resource "github_repository" "this" {
  lifecycle {
    ignore_changes = [
      allow_auto_merge,
      allow_merge_commit,
      allow_rebase_merge,
      allow_squash_merge,
      archive_on_destroy,
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

resource "github_repository_file" "this" {
  lifecycle {
    ignore_changes = [
      overwrite_on_create,
    ]
  }
}
