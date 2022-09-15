import { Repository } from "../resources/repository"
import { RepositoryFile } from "../resources/repository-file"
import { Config } from "../yaml/config"

const GUI_TOPICS = ['ipfs-gui', 'gui']

export async function addFileToGUIRepos(): Promise<void> {
  const config = Config.FromPath()

  const repositories = config
    .getResources(Repository)
    .filter(r => !r.archived)
    .filter(r => r.topics?.some(t => GUI_TOPICS.includes(t)))

  for (const repository of repositories) {
    const file = new RepositoryFile(repository.name, '.github/workflows/add_issues_to_gui_project.yml')
    file.content = '.github/workflows/add_issues_to_gui_project.yml'
    if (!config.someResource(file)) {
      console.log(`Adding ${file.file} file to ${file.repository} repository`)
      config.addResource(file)
    }
  }

  config.save()
}

addFileToGUIRepos()
