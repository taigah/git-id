# git-id

A simple tool to manage git identities and apply them to your repositories.

## Installation

```bash
deno install --allow-read --allow-write --allow-run --allow-env --importmap=https://raw.githubusercontent.com/taigah/git-id/master/import_map.json --unstable https://raw.githubusercontent.com/taigah/git-id/master/git-id.ts "$@"
```

## Usage

### Create an identity

```bash
git-id create <identifier>
```

### Remove an identity

```bash
git-id remove <identifier>
```

### Apply an identity

When in a git repository, you can use `git-id apply` to use your identity as your local git user

```bash
git-id apply <identifier>
```

### List available identities

```bash
git-id ls
```

### Configuring identities file location

By default, git-id stores the identities in `$HOME/.git-identities.json`, if you want to use another location use the `--id-file=<id file path>` flag.