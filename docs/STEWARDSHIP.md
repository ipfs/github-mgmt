_NOTE: This document is, and quite likely will always be, a work in progress. You can, and should, contribute to it to make as useful for GitHub Management Stewards as it can be._

# GitHub Management Steward

`github-mgmt stewards` is a team of people who are responsible for managing the GitHub Management configuration for the organization. They have write access to the GitHub Management repository, can review change requests and merge changes to the `master` branch.

Membership in the `github-mgmt stewards` team should be treated with **exactly as much care as having admin access to the organization**.

## What qualifications are expected from a GitHub Management Steward?

- familiarity with [GitHub Management](ABOUT.md)
- availability for reviews and merges of GitHub Management configuration changes
- being a trusted member of the organization

## What is expected from a GitHub Management Steward?

- review and merge changes to the GitHub Management configuration

### How to review and merge a GitHub Management pull request?

- Wait for the `Comment` check to pass
- Verify that the pull request contains only the changes you expect
- Verify that the plan posted as a comment introduces **only** the changes you expect
- Check if there are any open PRs created by the `Sync` workflow (titles starting with `sync`) and merge them first if there are
- Ask the author of the pull request to provide more context if needed
- Merge the pull request if everything checks out and verify that the `Apply` workflow initiated by the merge succeeded

## How to become a GitHub Management Steward?

To become a GitHub Management Steward, you should meet the [qualifications](#what-qualifications-are-expected-from-a-github-management-steward) and ask one of the existing stewards to approve your change request which adds you to the `github-mgmt stewards` team.

## What do I do if...?

GitHub Management is a relatively new project, GitHub APIs are constantly evolving and the GitHub Management configuration is a living document. You will likely encounter situations that are not covered by this document nor [HOWTOs](HOWTOS.md). If you do and you're unsure what to do, please reach out to @ipfs/ipdx.
