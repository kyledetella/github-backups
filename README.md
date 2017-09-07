# Github Backups

A backup and deletion utility that leverages the Github GraphQL API to easily backup and delete repositories. This project is in a very early stage and could change at anytime. Proceed with caution!

> **Note:** This library is only tested on macOS 10.12.x. Use at your own risk.

# Usage

## Basic usage

```
node . <backup|delete|print|version> -t <GITHUB_TOKEN> -u <GITHUB_USERNAME>
```

### Commands

#### `backup`

This will backup all of the available repos accessible by your token to the target directory. By default, this will attempt to clone the repos into a folder in the current directory called `gh-backup-yyyy-mm-dd`.

**Example**

This will clone your repos to a directory called `backups` on your Desktop (on macOS).

```
node . backup -t MY_TOKEN -u me --target ~/Desktop/backups
```

#### `delete`

_Coming soon_

#### `print`

Write the names of your repositories to a file on your machine. By default this will write the file in the current directory as `repos.txt`. Use the `--dry-run` flag to print the output to your terminal only.

### CLI Options

#### `--dry-run, -d`

Print the repos accessible via token. This will not attempt to clone any repos to your system.

#### `--token, -t`

**_required_**

A Github token. Visit your [Github settings](https://github.com/settings/tokens) page to generate a Personal Access Token. Required scopes are: `repo, user` for personal users and `read:org, repo` for org access.

#### `--username, -u`

A Github username associated with the token.

#### `--org, -o`

A Github org name. If provided with `username`, `org` will be ignored.

#### `--target, -t`

A path on your machine where you would like repos to be backed up.

##### Examples

Save to a folder called `repos` on your Desktop (macOS):

```
node . backup -t GH_TOKEN -u someone --target ~/Desktop/repos
```

Save to a folder called `repos` in the current directory:

```
node . backup -t GH_TOKEN -u someone --target ./repos
```

#### `--file, -f`

A file name to save your repository list to when using the `print` command.

##### Example

```
node . print -t GH_TOKEN -u someone -f ~/Desktop/repos.txt
```

---

# Development

_TBD_

## Tests

_TBD_
