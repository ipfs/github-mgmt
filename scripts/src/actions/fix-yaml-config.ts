import 'reflect-metadata'
import {Repository} from '../resources/repository'
import {addFileToAllRepos} from './shared/add-file-to-all-repos'
import {format} from './shared/format'
import {protectDefaultBranches} from './shared/protect-default-branches'
import {setPropertyInAllRepos} from './shared/set-property-in-all-repos'

function isInitialised(repository: Repository) {
  return ![
    '2022.ipfs.camp',
    'go-data-transfer-bus',
    'lightning-storm',
    'helia-ipns'
  ].includes(repository.name)
}

function isPublic(repository: Repository) {
  return repository.visibility === 'public'
}

protectDefaultBranches()
addFileToAllRepos(
  '.github/workflows/stale.yml',
  '.github/workflows/stale.yml',
  isInitialised
)
setPropertyInAllRepos(
  'secret_scanning',
  true,
  r => isInitialised(r) && isPublic(r)
)
setPropertyInAllRepos(
  'secret_scanning_push_protection',
  true,
  r => isInitialised(r) && isPublic(r)
)
format()
