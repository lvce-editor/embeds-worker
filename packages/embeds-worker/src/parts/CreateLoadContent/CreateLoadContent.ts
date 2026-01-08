export const createLoadContent = (id: any, uri: any, x: any, y: any, width: any, height: any): any => {
  return {
    id,
    uid: id,
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
}
