import { test, expect } from '@jest/globals'
import * as ProcessName from '../src/parts/ProcessName/ProcessName.ts'

test('processName', () => {
  expect(ProcessName.processName).toBe('embeds-worker')
})
