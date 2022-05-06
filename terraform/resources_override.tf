resource "github_membership" "this" {
  lifecycle {
    # @resources.membership.ignore_changes
    ignore_changes = [
      etag,
      id,
      # role
    ]
  }
}

resource "github_repository_collaborator" "this" {
  lifecycle {
    # @resources.repository_collaborator.ignore_changes
    ignore_changes = [
      id,
      invitation_id,
      # permission,
      permission_diff_suppression
    ]
  }
}

resource "github_repository_file" "this" {
  lifecycle {
    # @resources.repository_file.ignore_changes
    ignore_changes = [
      id,
      # branch,
      commit_author,
      commit_email,
      commit_message,
      commit_sha,
      overwrite_on_create,
      sha
    ]
  }
}


resource "github_team" "this" {
  lifecycle {
    # @resources.team.ignore_changes
    ignore_changes = [
      # id,
      create_default_maintainer,
      description,
      etag,
      ldap_dn,
      members_count,
      node_id,
      # parent_team_id,
      # privacy,
      slug
    ]
  }
}

resource "github_team_repository" "this" {
  lifecycle {
    # @resources.team_repository.ignore_changes
    ignore_changes = [
      etag,
      id,
      # permission
    ]
  }
}

resource "github_team_membership" "this" {
  lifecycle {
    # @resources.team_membership.ignore_changes
    ignore_changes = [
      etag,
      id,
      # role
    ]
  }
}
