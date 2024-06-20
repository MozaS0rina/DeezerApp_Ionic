import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicGenrePage } from './music-genre.page';

const routes: Routes = [
  {
    path: '',
    component: MusicGenrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicGenrePageRoutingModule {}
