import { BufReader } from 'https://deno.land/std@0.54.0/io/bufio.ts'

export interface PromptOptions {
  input?: Deno.Reader,
  output?: Deno.Writer
}

export async function prompt (message: string, options?: PromptOptions): Promise<string> {
  options = options ?? {}
  const input = options.input ?? Deno.stdin
  const output = options.output ?? Deno.stdout

  await output.write(new TextEncoder().encode(message))

  const lineRead = await new BufReader(input).readLine()
  const answer = lineRead?.line && new TextDecoder().decode(lineRead.line)
  
  return answer as string
}
