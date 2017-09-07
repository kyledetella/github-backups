const chalk = require('chalk')
const util = require('util')
const mkdirp = require('mkdirp')
const { exec } = require('child_process')

const md = util.promisify(mkdirp)

const protocol = 'git@github.com:' // https://github.com/

const repoCloner = (targetDirectory, login) => repoName => {
  return new Promise(async (resolve, reject) => {
    try {
      await md(targetDirectory)

      exec(
        `git clone ${protocol}${login}/${repoName}.git ${targetDirectory}/${repoName}`,
        (error, stdout, stderr) => {
          if (error) {
            if (error.code === 128) {
              console.log(
                chalk.red.bold('[ERROR]:'),
                `${repoName} may already exist!`
              )
              return resolve({
                dir: targetDirectory,
                name: repoName,
                status: 'skipped',
              })
            } else {
              return reject(error)
            }
          }

          console.log(
            chalk.blue('Cloning >'),
            stderr.trim().replace(/^Cloning\s/, `${repoName} `)
          )

          return resolve({
            dir: targetDirectory,
            name: repoName,
            status: 'cloned',
          })
        }
      )
    } catch (err) {
      console.log(chalk.red.bold('[ERROR]:'), error)
      reject(err)
    }
  })
}

module.exports = repoCloner
