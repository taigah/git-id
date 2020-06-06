import { readJson, writeJson } from '../deps/fs.ts'
import { parse as pathParse, join as pathJoin } from '../deps/path.ts'
import { CLIError } from './errors.ts'

export interface Identity {
  name: string,
  email: string
}

export async function loadIdentities (idFile: string): Promise<Map<string, Identity>> {
  try {
    const identities = await readJson(idFile) as Object
    return new Map(Object.entries(identities))
  } catch (err) {
    if (err.constructor === Deno.errors.NotFound) {
      try {
        // ensure directory and file
        const dir = pathParse(idFile).dir
        await Deno.mkdir(dir, { recursive: true })
        await Deno.writeFile(idFile, new Uint8Array())
        return new Map()
      } catch (err) {
        if (err.name === 'PermissionDenied') {
          throw new CLIError(`Permision denied: Could not write configuration directory or file`)
        }
        throw err
      }
    }
    if (err.message.includes(`Unexpected end of JSON input`)) {
      return new Map()
    }
    throw err
  }
}

export async function saveIdentities (idFile: string, identities: Map<string, Identity>) {
  const identitiesObject = Object.fromEntries(identities.entries())
  await writeJson(idFile, identitiesObject)
}

export function getDefaultIdFileLocation () {
  const XDG_CONFIG_HOME = Deno.env.get('XDG_CONFIG_HOME')
  if (XDG_CONFIG_HOME) {
    return pathJoin(XDG_CONFIG_HOME, 'git-id/identities.json')
  }
  const HOME = Deno.env.get('HOME')
  if (HOME) {
    return pathJoin(HOME, '.git-identities.json')
  }
  throw new CLIError(`Could not find a suitable directory, set $XDG_CONFIG_HOME, $HOME or use the --id-file flag`)
}
