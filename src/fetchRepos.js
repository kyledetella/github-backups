const fetch = require('node-fetch')

const { DEFAULT_TOTAL } = require('./constants')
const Query = require('./query')

const repoEdgeFetcher = (token, RepoQuery) => cursor => {
  return fetch(`https://api.github.com/graphql`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ query: RepoQuery(cursor) }),
  }).then(response => {
    if (response.ok) {
      return response.json()
    } else {
      return Promise.reject({
        status: response.status,
        statusText: response.statusText,
      })
    }
  })
}

const fetchRepos = async (login, username, token) => {
  const field = username ? 'user' : 'organization'
  const RepoQuery = Query(field, login, DEFAULT_TOTAL)
  const fetchRepoEdge = repoEdgeFetcher(token, RepoQuery)

  const fetchRepoEdges = async (cursor = null, repos = []) => {
    try {
      const { data, errors } = await fetchRepoEdge(cursor)

      if (errors) {
        return Promise.reject(errors)
      } else {
        const { [field]: { repositories: { edges, pageInfo } } } = data

        if (pageInfo.hasNextPage) {
          return await fetchRepoEdges(
            `"${pageInfo.endCursor}"`,
            repos.concat(edges)
          )
        } else {
          return repos.concat(edges)
        }
      }
    } catch (error) {
      console.log(chalk.red.bold('[ERROR]:'), error)
    }
  }

  const edges = await fetchRepoEdges()
  const names = edges.reduce((repoNames, edge) => {
    if (Array.isArray(edge)) {
      edge.forEach(({ node }) => repoNames.push(node.name))
    } else {
      repoNames.push(edge.node.name)
    }

    return repoNames
  }, [])

  return names
}

module.exports = fetchRepos
