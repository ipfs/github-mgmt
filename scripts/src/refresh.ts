import {State} from './terraform/state'
import {Config} from './yaml/config'

export async function refresh(state: State, config: Config): Promise<void> {
  await state.refresh()

  const refreshedResources = state.getAllResources()
  config.sync(refreshedResources)
}
