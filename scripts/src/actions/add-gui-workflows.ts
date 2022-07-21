import 'reflect-metadata'
import * as terraform from '../terraform'
import * as yaml from '../yaml'
import YAML from 'yaml'

// TODO: run this script as part of some workflow (PR?, sync?), for now run:
//       npm run build && TF_WORKSPACE=ipfs node lib/actions/add-gui-workflows.js
async function run(): Promise<void> {
  const config = yaml.getConfig()

  // TODO: we need a better abstraction for things that are defined in the YAML
  //       ideally, we should be able to replace all of this with something like:
  //       config.getRepositories().filter(repository => repository.topics.includes('ipfs-desktop')).map(repository => repository.name)
  const repositories = config.getResources([terraform.GithubRepository]).filter(repository => {
    return ((repository.value as YAML.Pair).value as YAML.YAMLMap).toJSON().topics?.includes('ipfs-desktop')
  }).map(repository => {
    return (repository.value as YAML.Pair).key as string
  })

  for (const repository of repositories) {
    // TODO: we need a better abstraction here, one which has a proper constructor
    //       and doesn't know anything about terraform (i.e. values.id)
    const file = new terraform.GithubRepositoryFile()
    file.values = {
      id: '',
      file: '.github/workflows/auto-project.yml',
      repository: repository,
      content: '.github/workflows/add_issues_to_gui_project.yml'
    }

    // TODO: this is not pretty, maybe the context should be optional?
    const resource = await file.getYAMLResource(null as any)

    // NOTE: add is a noop if a resource already exists
    config.add(resource)
  }

  config.save()
}

run()
