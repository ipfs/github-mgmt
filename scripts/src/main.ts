import 'reflect-metadata'
import {sync} from './sync'
import {refresh} from './refresh'
import {State} from './terraform/state'
import {Config} from './yaml/config'

async function run(): Promise<void> {
  const state = await State.New()
  const config = Config.FromPath()

  // This step calls GitHub API to get the latest state of the world
  // and updates the TF state to match. It only updates the resources,
  // not their attributes.
  await sync(state, config)
  config.save()

  // This step calls Terraform to get the latest state of the world
  // and updates the TF state to match. It updates the resource attributes.
  // It requires config to be saved first because it needs to know about
  // all the resources.
  await refresh(state, config)
  config.save()
}

run()
