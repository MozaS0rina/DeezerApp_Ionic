import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { RestService } from '../services/rest.service';
import { ArtistAlbums } from '../models/artist-albums';
import { AlbumTracks } from '../models/album-details';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.page.html',
  styleUrls: ['./artist-details.page.scss'],
})
export class ArtistDetailsPage implements OnInit {

  albums: ArtistAlbums[]=[];
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
            message: 'Loading albums ...'
          });
          await loading.present();
            //https://api.deezer.com/artist/id/albums/
          this.restService.getArtistAlbumTrackList(this.code).subscribe(
            (response) => {
              this.albums= response.data; // Access the data property
              console.log(this.albums); // Check the data
              this.loading = false;
              loading.dismiss();
            },
            (error) => {
              console.error('Error fetching albums:', error);
              this.errorMessage = 'Error fetching albums. Please try again later.';
              this.loading = false;
              loading.dismiss();
            }
          );
    }});
 
      // Check if we received params using object navigation
      this.activatedRoute.queryParams.subscribe(_ => {
        if (this.router.getCurrentNavigation()?.extras.state) {
          this.albums = this.router.getCurrentNavigation()?.extras.state!['artist-details'] as ArtistAlbums[];
        }
      });
    }
 

  refreshAlbums(event: any) {
    this.ngOnInit();
    event.target.complete();
  }
 
  showDetails(id:number) {
    const navigationExtras: NavigationExtras = {
      state: {
        id
      }
    };
    this.router.navigate(['/album-detail',id], navigationExtras);
  }//navigare spre albumele artistului selectat

}
