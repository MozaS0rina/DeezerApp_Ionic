import { Component, OnInit } from '@angular/core';
import { AlbumSong, AlbumTracks } from '../models/album-details';
import { RestService } from '../services/rest.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Media, MediaObject } from '@ionic-native/media/ngx';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.page.html',
  styleUrls: ['./album-detail.page.scss'],
})
export class AlbumDetailPage implements OnInit {
  songs: AlbumSong[]=[];
  loading: boolean = false;
  errorMessage: string = '';

  code?: number;
  constructor(private restService: RestService, public loadingCtrl: LoadingController, private activatedRoute: ActivatedRoute,
    private router: Router,) {}

    ngOnInit(): void {
      // Check if we received params using routerLink
      this.activatedRoute.params.subscribe(async (params) => {
        this.code = params['code'];
        if (this.code) {
          // Make API call to retrieve information about the specific country using the code
          const loading = await this.loadingCtrl.create({
            message: 'Loading songs ...'
          });
          await loading.present();
          //https://api.deezer.com/album/album_id
          this.restService.getAlbumDetails(this.code).subscribe(
            (response) => {
              this.songs= response.data; // Access the data property
              console.log(this.songs); // Check the data
              this.loading = false;
              loading.dismiss();
            },
            (error) => {
              console.error('Error fetching songs:', error);
              this.errorMessage = 'Error fetching songs. Please try again later.';
              this.loading = false;
              loading.dismiss();
            }
          );
    }});
 
      // Check if we received params using object navigation
      this.activatedRoute.queryParams.subscribe(_ => {
        if (this.router.getCurrentNavigation()?.extras.state) {
          this.songs = this.router.getCurrentNavigation()?.extras.state!['album-detail'] as AlbumSong[];
        }
      });
    }
 
    
  refreshSongs(event: any) {
    this.ngOnInit();
    event.target.complete();
  }
  
  showDetails(id:number) {
    const navigationExtras: NavigationExtras = {
      state: {
        id
      }
    };
    this.router.navigate(['/play-music',id], navigationExtras);
  }//navigare spre melodia albumului artistului selectat
  
}
