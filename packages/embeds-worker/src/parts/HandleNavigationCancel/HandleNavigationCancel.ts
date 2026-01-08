import type { SimpleBrowserState } from '../StatusBarState/StatusBarState.ts'

export const handleLoadContentDidNavigationCancel = (state: SimpleBrowserState, url: any): any => {
  return {
    ...state,
    isLoading: false,
  }
}
