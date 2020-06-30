import React, { useState } from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import MapGL, { Popup } from '@urbica/react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import PhotoList from './PhotoList'

const GET_GLYPHS_QUERY = gql`
  {
    Geoglyph(first: 10, filter: { in_town: { name: "Missoula" } }) {
      description
      location {
        longitude
        latitude
      }
      has_monogram {
        name
      }
      in_town {
        name
      }
      photos(first: 10, radius: 200) {
        url
      }
    }
  }
`

export default function MapSearch() {
  const theme = useTheme()
  const [viewport, setViewport] = useState({
    zoom: 11,
  })

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

  const { loading, error, data } = useQuery(GET_GLYPHS_QUERY)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

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
              latitude={data.Geoglyph[1].location.latitude}
              longitude={data.Geoglyph[1].location.longitude}
              zoom={viewport.zoom}
              onViewportChange={setViewport}
            >
              <Popup
                longitude={data.Geoglyph[1].location.longitude}
                latitude={data.Geoglyph[1].location.latitude}
                closeButton={true}
                closeOnClick={true}
              >
                <div>
                  <p>{data.Geoglyph[1].description}</p>
                </div>
              </Popup>
            </MapGL>
          </Paper>
        </Grid>
        {/* User Count */}
        <Grid item xs={12} md={4} lg={5}>
          <Paper className={fixedHeightPaper}>
            <PhotoList />
          </Paper>
        </Grid>
        {/* Recent Reviews */}
      </Grid>
    </React.Fragment>
  )
}
