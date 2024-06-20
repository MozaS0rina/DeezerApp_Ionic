
export interface AlbumDetails {
    id: number;
    title: string;
    image: string;
    picture: string;
    tracks: AlbumTracks;
  }
  
  export interface AlbumTracks {
    songs: AlbumSong[];
  }
  
  export interface AlbumSong {
    id: number;
    title: string;
    isrc: string;
    md5_image: string;
    link: string;
    duration: number;
    preview: string;
    cover:string;
    artist: AlbumArtists;
    album: AlbumSongDetail;
  }
  
  export interface AlbumSongDetail {
    id: number;
    title: string;
    image: string;
  }
  
  export interface AlbumArtists {
    name: string;
  }
  