import { test, expect } from '@jest/globals'
import * as GetPortTuple from '../src/parts/GetPortTuple/GetPortTuple.ts'

test('getPortTuple returns a MessageChannel with two ports', () => {
  const { port1, port2 } = GetPortTuple.getPortTuple()
  expect(port1).toBeInstanceOf(MessagePort)
  expect(port2).toBeInstanceOf(MessagePort)
})
