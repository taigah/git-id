import { prompt } from '../prompt.ts'
import { loadIdentities, saveIdentities } from '../utils.ts'
import { CLIError } from '../errors.ts'

export async function createIdentity (identifier?: string, idFile?: string) {
  if (identifier === undefined || identifier === '') {
    throw new CLIError(`You must provide an identifier for the identity`)
  }
  idFile = idFile as string
  const identities = await loadIdentities(idFile)
  if (identities.has(identifier)) {
    const answer = await prompt(`${identifier} is already taken, overwrite? [y/N] `)
    if (!answer.startsWith('y')) return Deno.exit(0)
  }

  const name = await prompt(`Name: `)
  const email = await prompt('Email: ')
  
  identities.set(identifier, { name, email })

  await saveIdentities(idFile, identities)

  console.log(`Identity '${identifier}' added to '${idFile}'`)
}
