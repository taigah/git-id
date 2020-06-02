import { assertEquals } from 'https://deno.land/std@0.54.0/testing/asserts.ts'
import { prompt } from './src/prompt.ts'

Deno.test('should prompt successfully', async () => {
  const expected = `something` + Math.random()
  const input = {
    async read (buffer: Uint8Array) {
      return new TextEncoder().encodeInto(`${expected}\n`, buffer).written
    }
  } as Deno.Reader

  // dummy output
  const output = {
    async write (buffer: Uint8Array) {
      return 0
    }
  } as Deno.Writer

  const answer = await prompt('Enter something:', { input, output })

  assertEquals(answer, expected)
})
