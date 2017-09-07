const chalk = require('chalk')
const path = require('path')

const fetchRepos = require('../fetchRepos')

const deleteRepos = async ({
  org,
  target,
  token,
  username,
  'dry-run': dryRun,
}) => {
  const login = username || org

  console.log(`${chalk.green('Looking up repos >')} This may take a moment`)
  const repoNames = await fetchRepos(login, username, token)
  console.log(
    `${chalk.green('Lookup complete >')} ${repoNames.length} repos found.`
  )

  console.log('')
  console.log(chalk.green.underline('Results (dry run) >'))
  console.log('')
  console.log(
    chalk.red.bold('[DANGER]:'),
    `Deleting repos is a ${chalk.underline(
      'PERMANENT & DESTRUCTIVE'
    )} action. We recommend backing up your repos first!`
  )
  console.log('')
  console.log(
    ` ${chalk.green(
      '>'
    )} The following repositories will be deleted: ${chalk.yellow(
      repoNames.sort().join(', ')
    )}`
  )
  console.log('')
}

module.exports = deleteRepos
