import { CLIError } from '../errors.ts'
import { loadIdentities, saveIdentities } from '../utils.ts'

export async function remove (identifier: string, idFile: string) {
  if (identifier === undefined || identifier === '') {
    throw new CLIError(`You must provide an identifier for the identity`)
  }

  idFile = idFile as string
  const identities = await loadIdentities(idFile)

  if (!identities.has(identifier)) {
    throw new CLIError(`Identity '${identifier}' not foun in '${idFile}'`)
  }

  identities.delete(identifier)

  await saveIdentities (idFile, identities)

  console.log(`Identity '${identifier}' removed from '${idFile}'`)
}
