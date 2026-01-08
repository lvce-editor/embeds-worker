import type { SimpleBrowserState } from '../StatusBarState/StatusBarState.ts'
import * as ElectronWebContentsViewFunctions from '../../ElectronWebContentsViewFunctions/ElectronWebContentsViewFunctions.js'

export const hideLoadContent = async (state: SimpleBrowserState): Promise<void> => {
  const { browserViewId } = state
  await ElectronWebContentsViewFunctions.hide(browserViewId)
}
