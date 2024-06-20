import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayMusicPage } from './play-music.page';

const routes: Routes = [
  {
    path: '',
    component: PlayMusicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayMusicPageRoutingModule {}
