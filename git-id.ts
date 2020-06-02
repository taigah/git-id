import { printHelp, printVersion } from './src/cli.ts'
import { createIdentity, ls, remove, apply } from './src/commands/mod.ts'
import { CLIError } from './src/errors.ts'
import { homeDir } from './src/utils.ts'

if (Deno.args.includes('-h') || Deno.args.includes('--help')) {
  printHelp()
}

if (Deno.args.includes('-v') || Deno.args.includes('--version')) {
  printVersion()
}

const args = []

for (const arg of Deno.args) {
  if (arg.startsWith('-')) {
    continue
  }
  args.push(arg)
}

if (args.length === 0) printHelp()

const [ command, ...subargs ] = args

const idFile = Deno.args.filter(arg => arg.startsWith('--id-file='))[0]?.split('=')[1]
  ?? homeDir() + '/.git-identities.json'


try {
  switch (command) {
    case 'create':
      await createIdentity(subargs[0], idFile)
      break
    case 'ls':
      await ls(idFile)
      break
    case 'remove':
      await remove(subargs[0], idFile)
      break
    case 'apply':
      await apply(subargs[0], idFile)
      break
  }
} catch (err) {
  if (err.constructor === CLIError) {
    const RED = '\x1b[31m'
    const RESET = '\x1b[0m'
    console.error(`${RED}${err.message}${RESET}`)
    Deno.exit(1)
  }
  throw err
}
