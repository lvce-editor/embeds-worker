import type { SimpleBrowserState } from '../StatusBarState/StatusBarState.ts'
import * as KeyBindings from '../../KeyBindings/KeyBindings.js'

export const handleLoadContentKeyBinding = async (state: SimpleBrowserState, keyBinding: any): Promise<any> => {
  await KeyBindings.handleKeyBinding(keyBinding)
  return state
}
