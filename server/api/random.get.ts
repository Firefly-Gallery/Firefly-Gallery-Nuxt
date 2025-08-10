import artworkLoader from '../utils/dataLoader'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const ratio = parseFloat(query.ratio as string) || 1

    // Get random artwork from preloaded data
    let randomArtwork
    if (ratio !== 1) {
      randomArtwork = artworkLoader.getRandomArtworkByRatio(ratio, 0.5)
    } else {
      randomArtwork = artworkLoader.getRandomArtwork()
    }
    
    // Format the artwork with CDN URLs
    return artworkLoader.formatArtworkForResponse(randomArtwork)
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: String(error)
    })
  }
})
