import React from 'react'
import { GridList, GridListTile } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

import Title from './Title'

export default function PhotoList(props) {
  const theme = useTheme()

  return (
    <React.Fragment>
      <Title>Photos From Mapillary</Title>
      <p>{props.glyph.description}</p>
      <GridList cellHeight={160} cols={2}>
        {props.glyph.photos.map((v, i) => (
          <GridListTile key={i} cols={1}>
            <img src={v.url}></img>
          </GridListTile>
        ))}
      </GridList>
    </React.Fragment>
  )
}
