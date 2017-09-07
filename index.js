const chalk = require('chalk')
const minimist = require('minimist')
const commandLineCommands = require('command-line-commands')

const { usage } = require('./src/constants')
const backup = require('./src/backup')
const print = require('./src/print')
const deleteRepos = require('./src/delete')

const validCommands = [null, 'backup', 'delete', 'print', 'version']

const printValidationError = error => {
  console.log('')
  console.log(chalk.red.bold('[ERROR]:'), error)
  console.log(`Run ${chalk.blue('node . --help')} for usage`)
  console.log('')
  process.exit()
}

let command
let argv

// Catch `null` command error to print custom error message
try {
  const results = commandLineCommands(validCommands)

  command = results.command
  argv = results.argv
} catch (error) {
  if (error.name && error.name === 'INVALID_COMMAND') {
    printValidationError('A valid command is required!')
    process.exit()
  } else {
    printValidationError('Something went wrong')
    process.exit()
  }
}

const args = require('minimist')(argv, {
  default: {
    protocol: 'ssh',
  },
  alias: {
    file: 'f',
    help: 'h',
    'dry-run': 'd',
    org: 'o',
    token: 't',
    username: 'u',
    version: 'v',
  },
})

if (command === 'version') {
  console.log(require('./package').version)
  process.exit()
}

if (args['help'] || command === null) {
  console.log(require('command-line-usage')(usage))
  process.exit()
}

if (!args.username && !args.org) {
  printValidationError('A valid username or org is required')
  process.exit()
}

if (!args.token) {
  printValidationError('A valid Github token is required')
  process.exit()
}

// Process command
if (command === 'backup') {
  backup(args).catch(error => console.log(chalk.red.bold('[ERROR]:'), error))
} else if (command === 'delete') {
  deleteRepos(args).catch(error =>
    console.log(chalk.red.bold('[ERROR]:'), error)
  )
} else if (command === 'print') {
  print(args).catch(error => console.log(chalk.red.bold('[ERROR]:'), error))
}
