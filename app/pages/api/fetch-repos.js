import { getSession } from 'next-auth/react'

async function fetchUserRepos(req, res) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const response = await fetch('https://api.github.com/user/repos', {
    headers: {
      Authorization: `token ${session.accessToken}`,
    },
  })

  if (!response.ok) {
    return res.status(response.status).json({ message: response.statusText })
  }

  const repos = await response.json()
  return res.status(200).json(repos)
}

export default fetchUserRepos
