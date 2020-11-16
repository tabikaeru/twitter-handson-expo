import algoliasearch, { SearchClient } from 'algoliasearch'

const appID = process.env.ALGOLIA_APPLICATION_ID
const apiKey = process.env.ALGOLIA_API_KEY
const tweetsIndexName = 'tweets'

let client: SearchClient | undefined

if (appID && apiKey) {
  client = algoliasearch(appID, apiKey)
}

export const getTweetsIndex = () => {
  if (!client) return
  const index = client.initIndex(tweetsIndexName)
  return index
}
