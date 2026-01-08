import type { SimpleBrowserState } from '../StatusBarState/StatusBarState.ts'
import * as GlobalEventBus from '../../GlobalEventBus/GlobalEventBus.js'

export const handleLoadContentTitleUpdated = async (state: SimpleBrowserState, title: any): Promise<any> => {
  const { uid } = state
  await GlobalEventBus.emitEvent('titleUpdated', uid, title)
  return state
}
