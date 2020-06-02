import { CLIError } from '../errors.ts'
import { loadIdentities, Identity } from '../utils.ts'

async function checkRepositoryPresence (dir: string): Promise<boolean> {
  const proc = Deno.run({
    cmd: [ 'git', 'status' ],
    stdin: 'null',
    stdout: 'null',
    stderr: 'null'
  })

  const status = await proc.status()

  return status.success
}

async function setConfiguration (name: string, email: string) {
  const proc1 = Deno.run({
    cmd: [ 'git', 'config', 'user.name', name ],
    stdin: 'null'
  })
  const proc2 = Deno.run({
    cmd: [ 'git', 'config', 'user.email', email ],
    stdin: 'null'
  })

  const [ status1, status2 ] = await Promise.all([ proc1.status(), proc2.status() ])

  return status1.success && status2.success
}

export async function apply (identifier: string, idFile: string) {
  if (identifier === undefined || identifier === '') {
    throw new CLIError(`You must provide an identifier for the identity`)
  }

  const dir = Deno.cwd()

  const repositoryPresence = await checkRepositoryPresence(dir)
  
  if (repositoryPresence === false) {
    throw new CLIError(`You are not in a git repository`)
  }

  const identities = await loadIdentities(idFile)

  if (!identities.has(identifier)) {
    throw new CLIError(`Identity '${identifier}' not found in '${idFile}'`)
  }

  const { name, email } = identities.get(identifier) as Identity

  await setConfiguration(name, email)
}
