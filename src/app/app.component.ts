import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {
    this.initializeApp();
  }
initializeApp() {
  setTimeout(() => {
    this.router.navigate(['/music-genre']);
  }, 2000); // Navigate to music genre after 2 seconds (adjust as needed)
}
}
