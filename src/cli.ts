import { VERSION } from '../version.ts'

const description = `Manage git identities and apply them to your repositories.`

const usage = [
  `git-id [options] create <name>`,
  `git-id [options] remove <name>`,
  `git-id [options] apply <name>`,
  `git-id [options] ls`
].map(v => '  ' + v).join('\n')

const options = [
  `-h --help            Print help`,
  `-v --version         Print version`,
  `--id-file=<file>     Set the id file`
].map(v => '  ' + v).join('\n')

export function printHelp () {
  console.log(`${description}

Usage:
${usage}
  
Options:
${options}
`)

  Deno.exit()
}

export  function printVersion () {
  console.log(`v${VERSION}`)
  Deno.exit()
}
