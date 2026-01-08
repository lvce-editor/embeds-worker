import type { SimpleBrowserState } from '../StatusBarState/StatusBarState.ts'

export const handleLoadContentWillNavigate = (state: SimpleBrowserState, url: any): any => {
  return {
    ...state,
    iframeSrc: url,
    isLoading: true,
  }
}
