import 'reflect-metadata'
import {Repository} from '../resources/repository.js'
import {RepositoryBranchProtectionRule} from '../resources/repository-branch-protection-rule.js'
import {globToRegex} from '../utils.js'
import {runDoNotEnforceAdmins} from './do-not-enforce-admins.js'
import {runAddFileToAllRepos} from './shared/add-file-to-all-repos.js'
import {runFormat} from './shared/format.js'
import {runSetPropertyInAllRepos} from './shared/set-property-in-all-repos.js'
import {runToggleArchivedRepos} from './shared/toggle-archived-repos.js'
import {runDescribeAccessChanges} from './shared/describe-access-changes.js'

import * as core from '@actions/core'

function isInitialised(repository: Repository) {
  return ![
    '2022.ipfs.camp',
    'go-data-transfer-bus',
    'lightning-storm',
    'helia-ipns'
  ].includes(repository.name)
}

function isHelia(repository: Repository) {
  return repository.name.startsWith('helia')
}

function isPublic(repository: Repository) {
  return repository.visibility === 'public'
}

function isFork(repository: Repository) {
  return [
    'uci'
  ].includes(repository.name)
}

async function run() {
  await runAddFileToAllRepos(
    '.github/pull_request_template.md',
    '.github/helia_pull_request_template.md',
    r => isInitialised(r) && isHelia(r)
  )

  await runSetPropertyInAllRepos(
    'secret_scanning',
    true,
    r => isInitialised(r) && isPublic(r)
  )
  await runSetPropertyInAllRepos(
    'secret_scanning_push_protection',
    true,
    r => isInitialised(r) && isPublic(r)
  )
  await runDoNotEnforceAdmins(
    (repository: Repository, rule: RepositoryBranchProtectionRule) =>
      isInitialised(repository) &&
      repository.default_branch !== undefined &&
      globToRegex(rule.pattern).test(repository.default_branch)
  )
  await runToggleArchivedRepos()
  const accessChangesDescription = await runDescribeAccessChanges()
  core.setOutput(
    'comment',
    `The following access changes will be introduced as a result of applying the plan:

<details><summary>Access Changes</summary>

\`\`\`
${accessChangesDescription}
\`\`\`

</details>`
  )
  await runFormat()
}

run()
