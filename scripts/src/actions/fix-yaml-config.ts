import 'reflect-metadata'
import {Repository} from '../resources/repository'
import {RepositoryBranchProtectionRule} from '../resources/repository-branch-protection-rule'
import {globToRegex} from '../utils'
import {doNotEnforceAdmins} from './do-not-enforce-admins'
import {addFileToAllRepos} from './shared/add-file-to-all-repos'
import {format} from './shared/format'
import {setPropertyInAllRepos} from './shared/set-property-in-all-repos'
import {toggleArchivedRepos} from './shared/toggle-archived-repos'
import {describeAccessChanges} from './shared/describe-access-changes'

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
  await addFileToAllRepos(
    '.github/workflows/stale.yml',
    '.github/workflows/stale.yml',
    r => isInitialised(r) && !isFork(r)
  )
  
  await addFileToAllRepos(
    '.github/pull_request_template.md',
    '.github/helia_pull_request_template.md',
    r => isInitialised(r) && isHelia(r)
  )
  
  await setPropertyInAllRepos(
    'secret_scanning',
    true,
    r => isInitialised(r) && isPublic(r)
  )
  await setPropertyInAllRepos(
    'secret_scanning_push_protection',
    true,
    r => isInitialised(r) && isPublic(r)
  )
  await doNotEnforceAdmins(
    (repository: Repository, rule: RepositoryBranchProtectionRule) =>
      isInitialised(repository) &&
      repository.default_branch !== undefined &&
      globToRegex(rule.pattern).test(repository.default_branch)
  )
  await toggleArchivedRepos()
  const accessChangesDescription = await describeAccessChanges()
  core.setOutput(
    'comment',
    `The following access changes will be introduced as a result of applying the plan:

<details><summary>Access Changes</summary>

\`\`\`
${accessChangesDescription}
\`\`\`

</details>`
  )
  await format()
}

run()
