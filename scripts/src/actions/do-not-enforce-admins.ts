import {Config} from '../yaml/config.js'
import {RepositoryBranchProtectionRule} from '../resources/repository-branch-protection-rule.js'
import {Repository} from '../resources/repository.js'
import * as core from '@actions/core'

export async function runDoNotEnforceAdmins(
  repositoryAndRuleFilter: (
    repository: Repository,
    branchProtectionRule: RepositoryBranchProtectionRule
  ) => boolean = () => true
): Promise<void> {
  const config = Config.FromPath()

  doNotEnforceAdmins(config, repositoryAndRuleFilter)
  
  config.save()
}

export async function doNotEnforceAdmins(
  config: Config,
  repositoryAndRuleFilter: (
    repository: Repository,
    branchProtectionRule: RepositoryBranchProtectionRule
  ) => boolean = () => true
): Promise<void> {
  const repositories = config.getResources(Repository).filter(r => !r.archived)
  const rules = config
    .getResources(RepositoryBranchProtectionRule)
    .filter(r => r.enforce_admins)
    .filter(rule => {
      const repository = repositories.find(
        repo => repo.name === rule.repository
      )
      if (!repository) {
        return false
      }
      return repositoryAndRuleFilter(repository, rule)
    })

  for (const rule of rules) {
    core.info(
      `Disabling enforce_admins for ${rule.repository}@${rule.pattern} repository`
    )
    rule.enforce_admins = false
    config.addResource(rule)
  }
}
