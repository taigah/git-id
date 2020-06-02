import { loadIdentities } from '../utils.ts'

export async function ls (idFile: string) {
  const identities = await loadIdentities(idFile)

  console.log(`Identities from '${idFile}'`)

  for (const [ identifier, identity ] of identities.entries()) {
    const { name, email } = identity
    console.log(`${identifier}\n  - name: ${name}\n  - email: ${email}`)
  }
}
