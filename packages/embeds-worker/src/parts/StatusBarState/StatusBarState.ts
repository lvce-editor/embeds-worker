export interface SimpleBrowserState {
  readonly assetDir: string
  readonly platform: number
  readonly uid: number
  readonly id: number
  readonly uri: string
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
  readonly headerHeight: number
  readonly iframeSrc: string
  readonly inputValue: string
  readonly title: string
  readonly browserViewId: number
  readonly canGoForward: boolean
  readonly canGoBack: boolean
  readonly isLoading: boolean
  readonly hasSuggestionsOverlay: boolean
  readonly suggestionsEnabled: boolean
  readonly shortcuts: readonly any[]
}
