import type { SimpleBrowserState } from '../StatusBarState/StatusBarState.ts'
import * as ElectronWebContentsView from '../ElectronWebContentsView/ElectronWebContentsView.ts'

export const disposeLoadContent = async (state: SimpleBrowserState): Promise<void> => {
  const { browserViewId } = state
  await ElectronWebContentsView.disposeWebContentsView(browserViewId)
}
