import type { SimpleBrowserState } from '../StatusBarState/StatusBarState.ts'

export const createDefaultState = (): SimpleBrowserState => {
  return {
    assetDir: '',
    browserViewId: 0,
    canGoBack: true,
    canGoForward: true,
    hasSuggestionsOverlay: false,
    headerHeight: 30,
    height: 0,
    id: 0,
    iframeSrc: '',
    inputValue: '',
    isLoading: false,
    platform: 0,
    shortcuts: [],
    suggestionsEnabled: false,
    title: '',
    uid: 0,
    uri: '',
    width: 0,
    x: 0,
    y: 0,
  }
}
