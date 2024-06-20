import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayMusicPageRoutingModule } from './play-music-routing.module';

import { PlayMusicPage } from './play-music.page';
import { Media } from '@ionic-native/media/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayMusicPageRoutingModule
  ],
  providers:[Media],
  declarations: [PlayMusicPage]
})
export class PlayMusicPageModule {}
