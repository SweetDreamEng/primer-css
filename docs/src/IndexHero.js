import React from 'react'
import {Box, Heading, Text} from '@primer/components'
import IndexImage from './IndexImage.svg'
import {version} from 'primer/package.json'
import {CONTENT_MAX_WIDTH} from './constants'

const IndexHero = () => (
  <Box bg="blue.5">
    <Box maxWidth={CONTENT_MAX_WIDTH} px={6} py={6} mx="auto" mb={3}>
      <Box mt={4} mb={4}>
        <Heading color="white" fontSize={7} fontWeight="light" pb={2}>
          Primer CSS
        </Heading>
        <Text color="blue.2" fontSize={2} fontFamily="mono">
          v{version}
        </Text>
      </Box>
      {/*
      <Box mb={6}>
        <IndexImage />
      </Box>
      */}
    </Box>
  </Box>
)

export default IndexHero
