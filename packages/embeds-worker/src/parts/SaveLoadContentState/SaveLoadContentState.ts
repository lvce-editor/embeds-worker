import type { SimpleBrowserState } from '../StatusBarState/StatusBarState.ts'

export const saveLoadContentState = (state: SimpleBrowserState): any => {
  const { iframeSrc } = state
  return {
    iframeSrc,
  }
}
