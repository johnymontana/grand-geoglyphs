const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()
const MAPILLARY_KEY = process.env.MAPILLARY_KEY

export const resolvers = {
  Geoglyph: {
    photos: async (glyph, args) => {
      const requestURL = `https://a.mapillary.com/v3/images?client_id=${MAPILLARY_KEY}&lookat=${glyph.location.longitude},${glyph.location.latitude}&closeto=${glyph.location.longitude},${glyph.location.latitude}&radius=${args.radius}&per_page=${args.first}`
      const response = await axios.get(requestURL)

      const features = response.data.features
      return features.map((v) => {
        return {
          requestURL,
          url: `https://images.mapillary.com/${v.properties.key}/thumb-1024.jpg`,
        }
      })
    },
  },
}
