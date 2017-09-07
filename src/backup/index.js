const chalk = require('chalk')
const path = require('path')

const repoCloner = require('./repoCloner')
const { DEFAULT_TARGET_DIR } = require('../constants')
const fetchRepos = require('../fetchRepos')

const backup = async ({ org, target, token, username, 'dry-run': dryRun }) => {
  const targetDirectory = path.resolve(target || DEFAULT_TARGET_DIR)
  const login = username || org

  console.log(`${chalk.green('Looking up repos >')} This may take a moment`)
  const repoNames = await fetchRepos(login, username, token)
  console.log(
    `${chalk.green('Lookup complete >')} ${repoNames.length} repos found.`
  )

  if (dryRun) {
    console.log('')
    console.log(chalk.green.underline('Results (dry run) >'))
    console.log('')
    console.log(
      ` ${chalk.green('>')} Target Directory: ${chalk.yellow(targetDirectory)}`
    )
    console.log(
      ` ${chalk.green(
        '>'
      )} The following repositories will be backed up to the target directory: ${chalk.yellow(
        repoNames.sort().join(', ')
      )}`
    )
    console.log('')
  } else {
    console.log(chalk.green('Cloning for backup >'), '...')

    const cloneRepo = repoCloner(targetDirectory, login)
    const result = await Promise.all(repoNames.sort().map(cloneRepo))
    const statusReport = result.reduce(
      (report, entry) => {
        report[entry.status].push(entry)

        return report
      },
      {
        mocked: [],
        skipped: [],
        cloned: [],
      }
    )
    console.log('')
    console.log(chalk.green.underline('Results'))
    console.log(
      ` ${chalk.green('>')} Backed up ${chalk.yellow(
        statusReport.cloned.length
      )} repos to ${chalk.yellow(targetDirectory)}`
    )
    console.log(
      ` ${chalk.green('>')} Skipped: ${chalk.yellow(
        statusReport.skipped.length
      )} repos`
    )
    console.log('')
  }
}

module.exports = backup
