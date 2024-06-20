import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicGenrePageRoutingModule } from './music-genre-routing.module';

import { MusicGenrePage } from './music-genre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicGenrePageRoutingModule
  ],
  declarations: [MusicGenrePage]
})
export class MusicGenrePageModule {}
