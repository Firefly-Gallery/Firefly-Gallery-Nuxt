
export interface Artwork {
  id: string;
  author: string;
  img: string[];
  size: number[];
  src: string;
  thumb: string;
  time: number;
}

export interface ArtworkItem {
  id: string;
  thumb: string;
  size: number[];
}


export function formatSrcURL(src:string):string {
  return src.replace("pid://", "https://pixiv.net/artworks/")
}
