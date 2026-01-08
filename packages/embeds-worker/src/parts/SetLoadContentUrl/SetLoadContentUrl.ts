import type { SimpleBrowserState } from '../StatusBarState/StatusBarState.ts'
import * as ElectronWebContentsViewFunctions from '../../ElectronWebContentsViewFunctions/ElectronWebContentsViewFunctions.js'
import * as IframeSrc from '../../IframeSrc/IframeSrc.js'
import * as HandleLoadContentInput from '../HandleInput/HandleInput.ts'

export const setLoadContentUrl = async (state: SimpleBrowserState, value: any): Promise<any> => {
  const newState1 = await HandleLoadContentInput.handleLoadContentInput(state, value)
  const { inputValue, browserViewId, shortcuts } = newState1
  const iframeSrc = IframeSrc.toIframeSrc(inputValue, shortcuts)
  // TODO await promises
  await ElectronWebContentsViewFunctions.setIframeSrc(browserViewId, iframeSrc)

  return {
    ...newState1,
    iframeSrc,
    isLoading: true,
  }
}
