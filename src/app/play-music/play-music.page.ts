import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { RestService } from '../services/rest.service';
import { AlbumSong } from '../models/album-details';
import { Media, MediaObject } from '@ionic-native/media/ngx';

import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-play-music',
  templateUrl: './play-music.page.html',
  styleUrls: ['./play-music.page.scss'],
})
export class PlayMusicPage implements OnInit {
  song!:AlbumSong;
  mediaFile!: MediaObject;
  isPlaying: boolean = false;
  loading: boolean = false;
  errorMessage: string = '';
  code?: number;
  constructor(private restService: RestService,private media: Media,
     public loadingCtrl: LoadingController, private activatedRoute: ActivatedRoute,
    private router: Router,) {}

    ngOnInit(): void {
      // Check if we received params using routerLink
      this.activatedRoute.params.subscribe(async (params) => {
        this.code = params['code'];
        if (this.code) {
          // Make API call to retrieve information about the specific country using the code
          const loading = await this.loadingCtrl.create({
            message: 'Loading the song ...'
          });
          await loading.present();
          
          this.restService.getSong(this.code).subscribe(
            (response) => {
              this.song= response; // Access the data property
              console.log(this.song); // Check the data
              this.loading = false;
              loading.dismiss();
            },
            (error) => {
              console.error('Error fetching the song:', error);
              this.errorMessage = 'Error fetching  the song. Please try again later.';
              this.loading = false;
              loading.dismiss();
            }
          );
    }});
 
      // Check if we received params using object navigation
      this.activatedRoute.queryParams.subscribe(_ => {
        if (this.router.getCurrentNavigation()?.extras.state) {
          this.song = this.router.getCurrentNavigation()?.extras.state!['play-music'] as AlbumSong;
        }
      });
    }


  refreshSongs(event: any) {
    this.ngOnInit();
    event.target.complete();
  }
  playMusic() {
    if (this.song && this.song.preview) {
      if (this.isPlaying) {
        this.mediaFile.stop();
        this.isPlaying = false;
      } else {
        this.mediaFile = this.media.create(this.song.preview);
        this.mediaFile.play();
        this.isPlaying = true;
      }
    } else {
      console.error('No song URL available to play.');
    }
  }
 

}
