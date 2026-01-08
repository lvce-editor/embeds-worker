export interface SimpleBrowserState {
  readonly assetDir: string
  readonly browserViewId: number
  readonly canGoBack: boolean
  readonly canGoForward: boolean
  readonly hasSuggestionsOverlay: boolean
  readonly headerHeight: number
  readonly height: number
  readonly id: number
  readonly iframeSrc: string
  readonly inputValue: string
  readonly isLoading: boolean
  readonly platform: number
  readonly shortcuts: readonly any[]
  readonly suggestionsEnabled: boolean
  readonly title: string
  readonly uid: number
  readonly uri: string
  readonly width: number
  readonly x: number
  readonly y: number
}
