import type { SimpleBrowserState } from '../StatusBarState/StatusBarState.ts'
import { set } from '../StatusBarStates/StatusBarStates.ts'

export const create = (uid: number, uri: string, x: number, y: number, width: number, height: number, platform: number, assetDir: string): void => {
  const state: SimpleBrowserState = {
    assetDir,
    browserViewId: 0,
    canGoBack: true,
    canGoForward: true,
    hasSuggestionsOverlay: false,
    headerHeight: 30,
    height,
    id: uid,
    iframeSrc: '',
    inputValue: '',
    isLoading: false,
    platform,
    shortcuts: [],
    suggestionsEnabled: false,
    title: '',
    uid,
    uri,
    width,
    x,
    y,
  }
  set(uid, state, state)
}
