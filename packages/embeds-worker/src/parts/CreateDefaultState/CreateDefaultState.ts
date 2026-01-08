import type { SimpleBrowserState } from '../StatusBarState/StatusBarState.ts'

export const createDefaultState = (): SimpleBrowserState => {
  return {
    assetDir: '',
    platform: 0,
    uid: 0,
    id: 0,
    uri: '',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
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
}
