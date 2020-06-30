import React, { useState } from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import MapGL, { Popup, Marker } from '@urbica/react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import PhotoList from './PhotoList'

export default function MapSearch(props) {
  const style = {
    paddingLeft: '4px',
    paddingRight: '4px',
    color: '#fff',
    cursor: 'pointer',
    background: '#1978c8',
    borderRadius: '50%',
    fontSize: '8px',
  }

  console.log(props)
  const theme = useTheme()
  const [viewport, setViewport] = useState({
    zoom: 11,
  })

  const [currentGlyph, setCurrentGlyph] = useState(props.glyphs[0])
  const [showDetails, setShowDetails] = useState(true)
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 540,
    },
  }))
  const classes = useStyles(theme)
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <React.Fragment>
      <Grid container spacing={4}>
        {/* Ratings Chart */}
        <Grid item xs={12} md={8} lg={7}>
          <Paper className={fixedHeightPaper}>
            <MapGL
              style={{ width: '100%', height: '100%' }}
              mapStyle="mapbox://styles/mapbox/light-v9"
              accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              latitude={currentGlyph.location.latitude}
              longitude={currentGlyph.location.longitude}
              zoom={viewport.zoom}
              onViewportChange={setViewport}
            >
              {/* TODO: map over data.Glyph and add a marker for each
                  then a single popup
             */}
              {props.glyphs.map((g, i) => {
                return (
                  <Marker
                    key={i}
                    longitude={g.location.longitude}
                    latitude={g.location.latitude}
                  >
                    <div style={style} onClick={() => setCurrentGlyph(g)}>
                      {g.has_monogram[0].name.substring(0, 1)}
                    </div>
                  </Marker>
                )
              })}
            </MapGL>
          </Paper>
        </Grid>
        {/* User Count */}
        <Grid item xs={12} md={4} lg={5}>
          <Paper className={fixedHeightPaper}>
            <PhotoList glyph={currentGlyph} />
          </Paper>
        </Grid>
        {/* Recent Reviews */}
      </Grid>
    </React.Fragment>
  )
}
