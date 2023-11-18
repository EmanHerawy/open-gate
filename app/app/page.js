'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import MediaCard from '@/components/MediaCard'
import Typography from '@mui/material/Typography'
import AddProjectModal from '@/components/AddProjectModal'

const projects = [
  {
    title: 'Solidity',
    url: 'https://github.com/ethereum/solidity',
    description:
      'Solidity is a statically-typed curly-braces programming language designed for developing smart contracts that run on the Ethereum Virtual Machine. Smart contracts are programs that are executed inside a peer-to-peer network where nobody has special authority over the execution, and thus they allow anyone to implement tokens of value, ownership, voting, and other kinds of logic.',
  },
  {
    title: 'React',
    url: 'https://github.com/facebook/react',
    description:
      'React is a JavaScript library for building user interfaces. React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable, simpler to understand, and easier to debug.',
  },
  {
    title: 'Vuejs',
    url: 'https://github.com/vuejs/vue',
    description:
      'Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. It is designed from the ground up to be incrementally adoptable, and can easily scale between a library and a framework depending on different use cases. It consists of an approachable core library that focuses on the view layer only, and an ecosystem of supporting libraries that helps you tackle complexity in large Single-Page Applications.',
  },
  {
    title: 'Vue carousel',
    url: 'https://github.com/ismail9k/vue3-carousel',
    description:
      'The CMYK color model (also known as process color, or four color) is a subtractive color model, based on the CMY color model, used in color printing, and is also used to describe the printing process itself.',
  },
]
export default function HomePage() {
  return (
    <Box>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h2" component="h2">
          Projects
        </Typography>
      </Box>
      <div>
        <Grid container rowSpacing={3} columnSpacing={3}>
          {projects.map((project) => (
            <Grid xs={6} key={project.title}>
              <MediaCard
                heading={project.title}
                text={project.description}
                url={project.url}
              />
            </Grid>
          ))}
        </Grid>
      </div>

      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <AddProjectModal />
      </Box>
    </Box>
  )
}
