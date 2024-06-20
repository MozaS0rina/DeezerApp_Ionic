import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  isDarkMode: boolean = false;

  constructor(){}
  ngOnInit(): void {
   
  }

  toggleTheme(event: any){
    if(event.detail.checked){
      document.body.setAttribute('color-theme','dark')
    }
    else{
      document.body.setAttribute('color-theme', 'light')
    }
  }

}
