import fs from 'fs'
import path from 'path'

interface ArtworkItem {
  author: string;
  id: string;
  img: string[];
  size: number[];
  src: string;
  thumb: string;
  time: number;
}

interface ArtworkData {
  _default: Record<string, ArtworkItem>
}

class ArtworkDataLoader {
  private artworks: ArtworkItem[] = []
  private artworksById: Map<string, ArtworkItem> = new Map()
  private isLoaded = false

  constructor() {
    this.loadData()
  }

  private loadData() {
    try {
      const dataPath = path.join(process.cwd(), 'server/data/artwork.json')
      const rawData = fs.readFileSync(dataPath, 'utf-8')
      const artworkData: ArtworkData = JSON.parse(rawData)
      
      // Convert to array and create lookup map
      this.artworks = Object.values(artworkData._default)
      
      // Create fast lookup by ID
      this.artworksById = new Map()
      this.artworks.forEach(artwork => {
        this.artworksById.set(artwork.id, artwork)
      })
      
      this.isLoaded = true
      console.log(`Loaded ${this.artworks.length} artworks into memory`)
    } catch (error) {
      console.error('Failed to load artwork data:', error)
      throw error
    }
  }

  public getAllArtworks(): ArtworkItem[] {
    if (!this.isLoaded) {
      throw new Error('Artwork data not loaded')
    }
    return this.artworks
  }

  public getArtworkById(id: string): ArtworkItem | undefined {
    if (!this.isLoaded) {
      throw new Error('Artwork data not loaded')
    }
    return this.artworksById.get(id)
  }

  public getArtworksByRatio(ratio: number, tolerance: number = 0.5): ArtworkItem[] {
    if (!this.isLoaded) {
      throw new Error('Artwork data not loaded')
    }
    
    return this.artworks.filter(artwork => {
      const artworkRatio = artwork.size[0] / artwork.size[1]
      return Math.abs(artworkRatio - ratio) < tolerance
    })
  }

  public getTotalCount(): number {
    if (!this.isLoaded) {
      throw new Error('Artwork data not loaded')
    }
    return this.artworks.length
  }

  public getPaginatedArtworks(page: number, size: number): {
    items: ArtworkItem[];
    total: number;
    totalPages: number;
    currentPage: number;
  } {
    if (!this.isLoaded) {
      throw new Error('Artwork data not loaded')
    }

    const total = this.artworks.length
    const totalPages = Math.ceil(total / size)
    const startIndex = (page - 1) * size
    const endIndex = startIndex + size
    const items = this.artworks.slice(startIndex, endIndex)

    return {
      items,
      total,
      totalPages,
      currentPage: page
    }
  }

  public getRandomArtwork(): ArtworkItem {
    if (!this.isLoaded) {
      throw new Error('Artwork data not loaded')
    }
    
    const randomIndex = Math.floor(Math.random() * this.artworks.length)
    return this.artworks[randomIndex]
  }

  public getRandomArtworkByRatio(ratio: number, tolerance: number = 0.5): ArtworkItem {
    if (!this.isLoaded) {
      throw new Error('Artwork data not loaded')
    }
    
    let filteredArtworks = this.getArtworksByRatio(ratio, tolerance)
    
    // If no artworks match the ratio, fall back to all artworks
    if (filteredArtworks.length === 0) {
      filteredArtworks = this.artworks
    }
    
    const randomIndex = Math.floor(Math.random() * filteredArtworks.length)
    return filteredArtworks[randomIndex]
  }

  // Helper method to format image URLs
  public formatArtworkForResponse(artwork: ArtworkItem): ArtworkItem {
    return {
      ...artwork,
      img: artwork.img.map(img => `cdn://${img}`)
    }
  }
}

// Create a singleton instance
const artworkLoader = new ArtworkDataLoader()

export default artworkLoader
export type { ArtworkItem }
