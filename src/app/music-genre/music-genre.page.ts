import { Component, OnInit } from '@angular/core';
import { MusicGenre, MusicGenreDetail } from '../models/music-genre';
import { RestService } from '../services/rest.service';
import { LoadingController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-music-genre',
  templateUrl: './music-genre.page.html',
  styleUrls: ['./music-genre.page.scss'],
})
export class MusicGenrePage implements OnInit {
  musicGenres: MusicGenreDetail[] = []; // definite assignment assertion
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private restService: RestService, public loadingCtrl: LoadingController,public router:Router) {}

  ngOnInit() {
    this.getMusicGenres();
  }

  async getMusicGenres() {
    this.loading = true;
    this.errorMessage = '';

    const loadingElement = await this.loadingCtrl.create({
      message: 'Loading music genres ...'
    });
    await loadingElement.present();

    this.restService.getMusicGenres().subscribe(
      (response) => {
        this.musicGenres = response.data; // Access the data property
        console.log(this.musicGenres); // Check the data
        this.loading = false;
        loadingElement.dismiss();
      },
      (error) => {
        console.error('Error fetching music genres:', error);
        this.errorMessage = 'Error fetching music genres. Please try again later.';
        this.loading = false;
        loadingElement.dismiss();
      }
    );
  }

  onGenreClicked(id: number, name: string) {
    console.log(`Clicked on genre: ${name} with ID: ${id}`);
    // Implement your navigation logic here
  }

  refreshGenres(event: any) {
    this.getMusicGenres();
    event.target.complete();
  }
  showDetails(genre:MusicGenreDetail) {
    const navigationExtras: NavigationExtras = {
      state: {
        genre
      }
    };
    this.router.navigate(['/artists', genre.id], navigationExtras);
  }
  showSettings() {
    const navigationExtras: NavigationExtras = {
      state: {
      }
    };
    this.router.navigate(['/settings'], navigationExtras);
  }
}
