import type { SimpleBrowserState } from '../StatusBarState/StatusBarState.ts'
import * as Assert from '../Assert/Assert.ts'
import * as ElectronWebContentsView from '../ElectronWebContentsView/ElectronWebContentsView.ts'
import * as ElectronWebContentsViewFunctions from '../../ElectronWebContentsViewFunctions/ElectronWebContentsViewFunctions.js'
import * as GetFallThroughKeyBindings from '../GetFallThroughKeyBindings/GetFallThroughKeyBindings.ts'
import * as KeyBindingsInitial from '../../KeyBindingsInitial/KeyBindingsInitial.js'
import * as SimpleBrowserPreferences from '../../SimpleBrowserPreferences/SimpleBrowserPreferences.js'
import * as GetUrlFromSavedState from '../GetUrlFromSavedState/GetUrlFromSavedState.ts'

export const backgroundLoadContent = async (state: SimpleBrowserState, savedState: any): Promise<any> => {
  // TODO duplicate code with loadContent
  const { x, y, width, height, headerHeight } = state
  const iframeSrc = GetUrlFromSavedState.getUrlFromSavedState(savedState)
  const shortcuts = SimpleBrowserPreferences.getShortCuts()
  // TODO since browser view is not visible at this point
  // it is not necessary to load keybindings for it
  const keyBindings = await KeyBindingsInitial.getKeyBindings()
  const fallThroughKeyBindings = GetFallThroughKeyBindings.getFallThroughKeyBindings(keyBindings)
  const browserViewId = await ElectronWebContentsView.createWebContentsView(0)
  await ElectronWebContentsViewFunctions.setFallthroughKeyBindings(fallThroughKeyBindings)
  Assert.number(browserViewId)
  await ElectronWebContentsViewFunctions.resizeWebContentsView(browserViewId, x, y + headerHeight, width, height - headerHeight)
  const { newTitle } = await ElectronWebContentsViewFunctions.setIframeSrc(browserViewId, iframeSrc)
  return {
    title: newTitle,
    uri: `simple-browser://${browserViewId}`,
    iframeSrc,
    shortcuts,
  }
}
