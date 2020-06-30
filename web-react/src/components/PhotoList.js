import React from 'react'
import { useTheme } from '@material-ui/core/styles'

import Title from './Title'

export default function PhotoList() {
  const theme = useTheme()

  return (
    <React.Fragment>
      <Title>Ratings Distribution</Title>
      <p>Look at all my photos</p>
    </React.Fragment>
  )
}
