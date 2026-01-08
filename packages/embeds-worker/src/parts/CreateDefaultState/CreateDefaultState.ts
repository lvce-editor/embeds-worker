import type { SimpleBrowserState } from '../StatusBarState/StatusBarState.ts'

export const createDefaultState = (): SimpleBrowserState => {
  return {
    assetDir: '',
    platform: 0,
    uid: 0,
  }
}
