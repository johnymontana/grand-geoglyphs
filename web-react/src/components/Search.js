import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import MapSearch from './MapSearch'

const GET_GLYPHS_QUERY = gql`
  {
    Geoglyph {
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
      photos(first: 100, radius: 2000) {
        url
      }
    }
  }
`

export default function Search() {
  const { loading, error, data } = useQuery(GET_GLYPHS_QUERY)

  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  console.log('DATA')
  console.log(data)

  return <MapSearch glyphs={data.Geoglyph} />
}
