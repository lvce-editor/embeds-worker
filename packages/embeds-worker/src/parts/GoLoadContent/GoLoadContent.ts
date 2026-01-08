import type { SimpleBrowserState } from '../StatusBarState/StatusBarState.ts'
import * as ElectronWebContentsViewFunctions from '../../ElectronWebContentsViewFunctions/ElectronWebContentsViewFunctions.js'
import * as IframeSrc from '../../IframeSrc/IframeSrc.js'

export const goLoadContent = (state: SimpleBrowserState): any => {
  const { inputValue, browserViewId, suggestionsEnabled, hasSuggestionsOverlay, shortcuts } = state
  const iframeSrc = IframeSrc.toIframeSrc(inputValue, shortcuts)
  // TODO await promises
  void ElectronWebContentsViewFunctions.setIframeSrc(browserViewId, iframeSrc)
  void ElectronWebContentsViewFunctions.focus(browserViewId)
  if (suggestionsEnabled && hasSuggestionsOverlay) {
    // void ElectronBrowserViewSuggestions.disposeBrowserView()
  }
  return {
    ...state,
    iframeSrc,
    isLoading: true,
  }
}
