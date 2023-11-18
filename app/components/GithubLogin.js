import { useSession, signIn, signOut } from 'next-auth/react'
import GithubRepos from '@/components/GithubRepos'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export default function GithubLogin() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar alt={session.user.name} src={session.user.image} />
          <Typography variant="h6">{session.user.name}</Typography>
        </Box>
        <GithubRepos />
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    )
  }
  return <Button onClick={() => signIn('github')}>Connect Github</Button>
}
