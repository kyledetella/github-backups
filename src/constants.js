const chalk = require('chalk')
const pkg = require('../package')

const usage = [
  {
    header: `GH/GQL (v${pkg.version})`,
    content: 'Easily backup and delete your Github repositories',
  },
  {
    header: 'Usage',
    content: 'node . [command] <options>',
  },
  {
    header: 'Commands',
    content: [
      {
        name: 'backup',
        summary: 'Backup all available repos to a target directory',
      },
      {
        name: 'delete',
        summary: `[${chalk.red.underline(
          'Danger Zone!!!'
        )}] Delete repositories.`,
      },
      {
        name: 'print',
        summary: 'Print available repos accessible via your token',
      },
      { name: 'version', summary: 'Print the version.' },
    ],
  },
  {
    header: 'Required options',
    optionList: [
      {
        name: 'dry-run',
        alias: 'd',
        description:
          'Print affected repositories. No permanent actions will be taken.',
      },
      {
        name: 'username',
        alias: 'u',
        typeLabel: '[underline]{string}',
        description:
          'Github username associated with token (either username or org is required)',
      },
      {
        name: 'org',
        alias: 'o',
        typeLabel: '[underline]{string}',
        description: 'Github org (either username or org is required)',
      },
      {
        name: 'token',
        alias: 't',
        typeLabel: '[underline]{string}',
        description:
          'Github personal access token with required permissions (read:org, repo, delete_repo).',
      },
      {
        name: 'target',
        typeLabel: '[underline]{string}',
        description: `A path on your machine to clone repos into for backup. ${chalk.blue(
          '[clone only]'
        )}`,
      },
    ],
  },
]

const date = require('dateformat')(new Date(), 'yyyy-09-07')
const DEFAULT_TARGET_DIR = `gh-backup-${date}`
const DEFAULT_TOTAL = 100

module.exports = {
  DEFAULT_TARGET_DIR,
  DEFAULT_TOTAL,
  usage,
}
