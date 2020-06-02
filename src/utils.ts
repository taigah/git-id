import { readJson } from 'https://deno.land/std@0.54.0/fs/read_json.ts'
import { writeJson } from 'https://deno.land/std@0.54.0/fs/write_json.ts'

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
      await Deno.writeFile(idFile, new Uint8Array())
      return new Map()
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

export function homeDir () {
  return Deno.env.get('HOME')
}
