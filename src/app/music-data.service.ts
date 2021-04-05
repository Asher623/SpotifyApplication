import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { environment } from './../environments/environment';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }  

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
      }));
  }

  getArtistById(id): Observable<SpotifyApi.SingleArtistResponse>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumsByArtistId(id): Observable<SpotifyApi.ArtistsAlbumsResponse>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  
  }
  getAlbumById(id): Observable<SpotifyApi.SingleAlbumResponse>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  
  }

  addToFavourites(id): Observable<[String]> {
    return this.http.put<[String]>(`${environment.userAPIBase}/favourites/${id}`, id);
  }

  searchArtists(searchString): Observable<SpotifyApi.ArtistSearchResponse>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getFavourites(): Observable<SpotifyApi.MultipleTracksResponse> {
    return this.http.get<[String]>(`${environment.userAPIBase}/favourites/`).pipe(mergeMap(favouritesArray => {
      if(favouritesArray["message"].length > 0){
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
          return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${favouritesArray["message"].join()}`, { headers: { "Authorization": `Bearer ${token}` } });
        }));}
      return new Observable(o=>o.next({tracks: []}));
    }));
  }

  removeFromFavourites(id): Observable<any> {
    return this.http.delete<[String]>(`${environment.userAPIBase}/favourites/${id}`).pipe(mergeMap(favouritesArray => {
      if(favouritesArray["message"].length > 0){
      return this.getFavourites();
      }
      return  new Observable(o=>o.next({tracks: []}));
    }));
  }
}





