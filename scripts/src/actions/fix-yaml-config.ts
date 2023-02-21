import 'reflect-metadata'
import {Repository} from '../resources/repository'
import {addFileToAllRepos} from './shared/add-file-to-all-repos'
import {format} from './shared/format'

const uninitialisedRepositoryNames = [
  '2022.ipfs.camp',
  'go-data-transfer-bus',
  'lightning-storm',
  'helia-ipns'
]

addFileToAllRepos(
  '.github/workflows/stale.yml',
  '.github/workflows/stale.yml',
  (repository: Repository) =>
    !uninitialisedRepositoryNames.includes(repository.name)
)
format()
