import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MusicGenre, MusicGenreDetail } from '../models/music-genre';
import { Artist, ArtistData } from '../models/artist';
import { ArtistDetail } from '../models/artist-detail';
import { ArtistAlbums } from '../models/artist-albums';
import { AlbumDetails, AlbumSong, AlbumTracks } from '../models/album-details';


const PROXY_URL ='https://proxy.cors.sh/http://api.deezer.com';

//const DEEZER_API_URL = 'https://api.deezer.com';
const MUSIC_GENRE = '/genre';
const ARTIST = '/genre/{genre_id}/artists';
const ARTIST_DETAIL = '/artist/{artist_id}/top?limit=50';
const ARTIST_TRACK_LIST = '/artist/{artist_id}/albums/';
const ALBUM_DETAIL = '/album/{album_id}/tracks/';
const SONG='/track/{song_id}';
const headers = new HttpHeaders({
  'x-cors-api-key': 'temp_1d8b2a516fd1950bfd48103cd9cceb57'
});

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

 
  getMusicGenres(): Observable<{data: MusicGenreDetail[]}> {
    return this.http.get<{data: MusicGenreDetail[]}>(`${PROXY_URL}${MUSIC_GENRE}`, { headers })
      .pipe(catchError(this.handleError));
  }//genuri muzicale

  getArtistsByGenre(genre_id: number): Observable< {data:ArtistData[] }> {
    const url = `${PROXY_URL}${ARTIST.replace('{genre_id}', genre_id.toString())}`;
    return this.http.get< {data:ArtistData[] }>(url, { headers })
      .pipe(catchError(this.handleError));
  }//artistii din genul muzical selectat
  getArtistAlbumTrackList(artist_id: number): Observable<{ data: ArtistAlbums[] }> {
    const url = `${PROXY_URL}${ARTIST_TRACK_LIST.replace('{artist_id}', artist_id.toString())}`;
    return this.http.get<{ data: ArtistAlbums[] }>(url, { headers })
      .pipe(catchError(this.handleError));
  }//albumele unui artist selectat
  getAlbumDetails(album_id: number): Observable<{data:AlbumSong[]}> {
    const url = `${PROXY_URL}${ALBUM_DETAIL.replace('{album_id}', album_id.toString())}`;
    return this.http.get<{data:AlbumSong[]}>(url,{ headers })
      .pipe(
        tap(data=>console.log(data)),
        catchError(this.handleError)
      );
  }//melodii dintr-un album al unui artist selectat
  getArtistAllSongs(artist_id: number): Observable<{data: ArtistDetail}> {
    const url = `${PROXY_URL}${ARTIST_DETAIL.replace('{artist_id}', artist_id.toString())}`;
    return this.http.get<{data: ArtistDetail}>(url,{ headers })
      .pipe(catchError(this.handleError));
  }
  //https://api.deezer.com/track/1966677787
  getSong(song_id: number): Observable<AlbumSong> {
    const url = `${PROXY_URL}${SONG.replace('{song_id}', song_id.toString())}`;
    return this.http.get<AlbumSong>(url,{ headers })
      .pipe(catchError(this.handleError));
  }//melodia selectata din album

  private handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    if (error instanceof HttpErrorResponse) {
      const err = error.message || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return throwError(() => new Error(errMsg));
  }
}
