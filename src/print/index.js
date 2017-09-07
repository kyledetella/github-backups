const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const fetchRepos = require('../fetchRepos')

const printRepos = async ({
  file,
  org,
  token,
  username,
  'dry-run': dryRun,
}) => {
  const login = username || org
  const fileName = typeof file === 'string' ? file : 'repos.txt'
  const filePath = path.resolve(process.cwd(), fileName)

  console.log(`${chalk.green('Looking up repos >')} This may take a moment`)
  const repoNames = await fetchRepos(login, username, token)
  console.log(
    `${chalk.green('Lookup complete >')} ${repoNames.length} repos found.`
  )

  if (dryRun) {
    console.log('')
    if (file) {
      console.log(`${chalk.green('File will be written as >')} ${filePath}`)
    }
    console.log(
      `${chalk.green('Repos >')} ${chalk.yellow(repoNames.sort().join(', '))}`
    )
    console.log('')
  } else {
    fs.writeFile(filePath, repoNames.sort().join('\n'), err => {
      if (err) {
        return reject(err)
      } else {
        console.log(`${chalk.green('Repo list written to >')} ${filePath}`)
        console.log('')
      }
    })
  }
}

module.exports = printRepos
