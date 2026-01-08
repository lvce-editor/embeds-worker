import type { SimpleBrowserState } from '../StatusBarState/StatusBarState.ts'

export const resize = (state: SimpleBrowserState, dimensions: any): SimpleBrowserState => {
  return {
    ...state,
    ...dimensions,
  }
}
