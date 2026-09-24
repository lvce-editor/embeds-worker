import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { commandMap } from '../src/parts/MainProcessCommandMap/MainProcessCommandMap.ts'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'

test('preserves the context menu payload from the direct main-process connection', async () => {
  const invocations: unknown[][] = []
  ParentRpc.set(
    MockRpc.create({
      commandMap: {},
      invoke: async (method: string, ...args: readonly unknown[]) => {
        invocations.push([method, ...args])
      },
    }),
  )
  const event = { browserViewId: 12, isEditable: true, linkURL: 'https://example.com/', x: 10, y: 20 }

  // Main process sends one payload containing browserViewId, with no leading ID.
  await commandMap['ElectronBrowserView.handleContextMenu'](event)

  expect(invocations).toEqual([['ElectronBrowserView.handleContextMenu', event]])
})
