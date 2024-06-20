export interface Artist {
    data: ArtistData[];
  }
  
  export interface ArtistData {
    id: number;
    name: string;
    image: string;
    picture: string;
  }