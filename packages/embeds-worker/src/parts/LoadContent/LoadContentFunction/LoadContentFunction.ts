import type { SimpleBrowserState } from '../../StatusBarState/StatusBarState.ts'
import * as Assert from '../../Assert/Assert.ts'
import * as ElectronWebContentsView from '../../ElectronWebContentsView/ElectronWebContentsView.js'
import * as ElectronWebContentsViewFunctions from '../../ElectronWebContentsViewFunctions/ElectronWebContentsViewFunctions.js'
import * as GetFallThroughKeyBindings from '../../GetFallThroughKeyBindings/GetFallThroughKeyBindings.js'
import * as KeyBindingsInitial from '../../KeyBindingsInitial/KeyBindingsInitial.js'
import * as Preferences from '../../Preferences/Preferences.js'
import * as SimpleBrowserPreferences from '../../SimpleBrowserPreferences/SimpleBrowserPreferences.js'
import * as GetLoadContentId from '../GetLoadContentId/GetLoadContentId.ts'
import * as GetUrlFromSavedState from '../GetUrlFromSavedState/GetUrlFromSavedState.ts'

export const loadContent = async (state: SimpleBrowserState, savedState: any): Promise<any> => {
  const { x, y, width, height, headerHeight, uri, uid } = state
  const idPart = uri.slice('simple-browser://'.length)
  const id = GetLoadContentId.getLoadContentId(idPart)
  const iframeSrc = GetUrlFromSavedState.getUrlFromSavedState(savedState)
  // TODO load keybindings in parallel with creating browserview
  const keyBindings = await KeyBindingsInitial.getKeyBindings()
  const suggestionsEnabled = Preferences.get('simpleBrowser.suggestions')
  const browserViewX = x
  const browserViewY = y + headerHeight
  const browserViewWidth = width
  const browserViewHeight = height - headerHeight
  const shortcuts = SimpleBrowserPreferences.getShortCuts()

  if (id) {
    const actualId = await ElectronWebContentsView.createWebContentsView(id, uid)
    await ElectronWebContentsViewFunctions.setFallthroughKeyBindings(keyBindings)
    await ElectronWebContentsViewFunctions.resizeWebContentsView(actualId, browserViewX, browserViewY, browserViewWidth, browserViewHeight)
    if (id !== actualId) {
      await ElectronWebContentsViewFunctions.setIframeSrc(actualId, iframeSrc)
    }
    return {
      ...state,
      iframeSrc,
      title: 'Simple Browser',
      browserViewId: actualId,
      suggestionsEnabled,
      shortcuts,
    }
  }

  const fallThroughKeyBindings = GetFallThroughKeyBindings.getFallThroughKeyBindings(keyBindings)
  const browserViewId = await ElectronWebContentsView.createWebContentsView(/* restoreId */ 0, uid)
  await ElectronWebContentsViewFunctions.setFallthroughKeyBindings(fallThroughKeyBindings)
  await ElectronWebContentsViewFunctions.resizeWebContentsView(browserViewId, browserViewX, browserViewY, browserViewWidth, browserViewHeight)
  Assert.number(browserViewId)
  await ElectronWebContentsViewFunctions.setIframeSrc(browserViewId, iframeSrc)
  const { title, canGoBack, canGoForward } = await ElectronWebContentsViewFunctions.getStats(browserViewId)
  return {
    ...state,
    iframeSrc,
    title,
    browserViewId,
    canGoBack,
    canGoForward,
    uri: `simple-browser://${browserViewId}`,
    suggestionsEnabled,
    shortcuts,
  }
}
