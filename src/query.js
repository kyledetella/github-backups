// field: 'organization' | 'user'
const Query = (field, login, total) => (cursor = null) => `
  query {
    ${field}(login: "${login}") {
      repositories(
        first: ${total},
        after: ${cursor},
        affiliations: [OWNER],
        orderBy: {
          field: CREATED_AT,
          direction: ASC
        }
      ) {
        edges {
          node {
            createdAt
            name
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  }
`

module.exports = Query
