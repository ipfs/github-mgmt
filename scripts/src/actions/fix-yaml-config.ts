import 'reflect-metadata'
import {addFileToAllRepos} from './shared/add-file-to-all-repos'
import {format} from './shared/format'

addFileToAllRepos('.github/workflows/stale.yml', '.github/workflows/stale.yml')
format()
