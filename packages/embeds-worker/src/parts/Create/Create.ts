import type { SimpleBrowserState } from '../StatusBarState/StatusBarState.ts'
import { set } from '../StatusBarStates/StatusBarStates.ts'

export const create = (uid: number, uri: string, x: number, y: number, width: number, height: number, platform: number, assetDir: string): void => {
  const state: SimpleBrowserState = {
    assetDir,
    platform,
    uid,
    id: uid,
    uri,
    x,
    y,
    width,
    height,
    headerHeight: 30,
    iframeSrc: '',
    inputValue: '',
    title: '',
    browserViewId: 0,
    canGoForward: true,
    canGoBack: true,
    isLoading: false,
    hasSuggestionsOverlay: false,
    suggestionsEnabled: false,
    shortcuts: [],
  }
  set(uid, state, state)
}
