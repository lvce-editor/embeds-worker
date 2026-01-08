import type { SimpleBrowserState } from '../StatusBarState/StatusBarState.ts'

export const isEqual = (oldState: SimpleBrowserState, newState: SimpleBrowserState): boolean => {
  return oldState.statusBarItemsLeft === newState.statusBarItemsLeft && oldState.statusBarItemsRight === newState.statusBarItemsRight
}
