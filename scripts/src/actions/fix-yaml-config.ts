import 'reflect-metadata'
import {Repository} from '../resources/repository'
import {addFileToAllRepos} from './shared/add-file-to-all-repos'
import {format} from './shared/format'

function isGUIRepository(repository: Repository): boolean {
  const GUI_TOPICS = ['ipfs-gui', 'gui']
  return repository.topics?.some(t => GUI_TOPICS.includes(t)) ?? false
}

addFileToAllRepos(
  '.github/workflows/add_issues_to_gui_project.yml',
  '.github/workflows/add_issues_to_gui_project.yml',
  isGUIRepository
)
format()
