import { Component, OnInit } from '@angular/core';
import { ArtistData } from '../models/artist';
import { RestService } from '../services/rest.service';
import { ArtistDetail } from '../models/artist-detail';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.page.html',
  styleUrls: ['./artists.page.scss'],
})
export class ArtistsPage implements OnInit {
  artists: ArtistData[]=[];
  loading: boolean = false;
  errorMessage: string = '';
  data = [];
  code?: number;
  constructor(private restService: RestService, public loadingCtrl: LoadingController, private activatedRoute: ActivatedRoute,
    private router: Router,) {}

    ngOnInit(): void {
    this.getData();
     
    }
    getData(): void {
      // Check if we received params using routerLink
      this.activatedRoute.params.subscribe(async (params) => {
        this.code = params['code'];
        if (this.code) {
          // Make API call to retrieve information about the specific country using the code
          const loading = await this.loadingCtrl.create({
            message: 'Loading artists ...'
          });
          await loading.present();

          this.restService.getArtistsByGenre(this.code).subscribe(
            (response) => {
              this.artists= response.data; // Access the data property
              console.log(this.artists); // Check the data
              this.loading = false;
              loading.dismiss();
            },
            (error) => {
              console.error('Error fetching artists:', error);
              this.errorMessage = 'Error fetching artists. Please try again later.';
              this.loading = false;
              loading.dismiss();
            }
          );
    }});
 
      // Check if we received params using object navigation
      this.activatedRoute.queryParams.subscribe(_ => {
        if (this.router.getCurrentNavigation()?.extras.state) {
          this.artists = this.router.getCurrentNavigation()?.extras.state!['artists'] as ArtistDetail[];
        }
      });
     
    }

  refreshArtists(event: any) {
    this.ngOnInit();
    event.target.complete();
  }
  onArtistClicked(id: number, name: string) {
    console.log(`Clicked on artist: ${name} with ID: ${id}`);
  }
 
  showDetails(artist_id:number) {
    const navigationExtras: NavigationExtras = {
      state: {
        artist_id
      }
    };
    this.router.navigate(['/artist-details',artist_id], navigationExtras);
  }//navigare spre albumele artistului selectat
}
