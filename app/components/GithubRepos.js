import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

function Repositories() {
  const { data: session } = useSession()
  const [repos, setRepos] = useState([])

  useEffect(() => {
    if (!session) return

    // Define the async function inside useEffect
    const fetchRepos = async () => {
      try {
        const response = await fetch('/api/fetch-repos')
        if (!response.ok) throw new Error('Failed to fetch')

        const data = await response.json()
        if (data && data.length) {
          setRepos(data)
        }
      } catch (error) {
        console.error('Error fetching repos:', error)
      }
    }

    // Call the function
    fetchRepos()
  }, [session])

  if (!session) {
    return <p>Please log in to see your repositories.</p>
  }

  return (
    <div>
      <h2>Your Repositories</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Repositories
