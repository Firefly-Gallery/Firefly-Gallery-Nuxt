import artworkLoader from '../utils/dataLoader'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const page = Math.max(1, parseInt(query.page as string) || 1)
    const size = 50
    
    // Get paginated data from preloaded artworks
    const paginationResult = artworkLoader.getPaginatedArtworks(page, size)
    
    // Format for list response (only id, size, thumb)
    const items = paginationResult.items.map(artwork => ({
      id: artwork.id,
      size: artwork.size,
      thumb: `cdn://thumbs/${artwork.thumb}.jpg`
    }))
    
    return {
      total: paginationResult.total,
      pages: paginationResult.totalPages,
      images: items,
      current_page: paginationResult.currentPage
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: String(error)
    })
  }
})
