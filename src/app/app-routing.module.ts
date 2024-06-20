import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'music-genre',
    loadChildren: () => import('./music-genre/music-genre.module').then( m => m.MusicGenrePageModule)
  },
  {
    path: 'artists/:code',
    loadChildren: () => import('./artists/artists.module').then( m => m.ArtistsPageModule)
  },
  {
    path: 'artists',
    loadChildren: () => import('./artists/artists.module').then( m => m.ArtistsPageModule)
  },
  {
    path: 'artist-details',
    loadChildren: () => import('./artist-details/artist-details.module').then( m => m.ArtistDetailsPageModule)
  },
  {
    path: 'artist-details/:code',
    loadChildren: () => import('./artist-details/artist-details.module').then( m => m.ArtistDetailsPageModule)
  },
  {
    path: 'album-detail',
    loadChildren: () => import('./album-detail/album-detail.module').then( m => m.AlbumDetailPageModule)
  },
  {
    path: 'album-detail/:code',
    loadChildren: () => import('./album-detail/album-detail.module').then( m => m.AlbumDetailPageModule)
  },
  {
    path: 'play-music',
    loadChildren: () => import('./play-music/play-music.module').then( m => m.PlayMusicPageModule)
  },
  {
    path: 'play-music/:code',
    loadChildren: () => import('./play-music/play-music.module').then( m => m.PlayMusicPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
