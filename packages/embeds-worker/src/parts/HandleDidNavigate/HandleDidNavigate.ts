import type { SimpleBrowserState } from '../StatusBarState/StatusBarState.ts'

export const handleLoadContentDidNavigate = (state: SimpleBrowserState, url: any): any => {
  return {
    ...state,
    iframeSrc: url,
    isLoading: false,
  }
}
