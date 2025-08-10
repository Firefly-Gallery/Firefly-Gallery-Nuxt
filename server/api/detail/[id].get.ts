import artworkLoader from '../../utils/dataLoader'

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No id provided'
      })
    }
    
    // Get artwork from preloaded data
    const artwork = artworkLoader.getArtworkById(id)
    
    if (!artwork) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Could not find the specific artwork'
      })
    }
    
    // Format the artwork with CDN URLs
    return artworkLoader.formatArtworkForResponse(artwork)
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: String(error)
    })
  }
})
