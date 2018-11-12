import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedFeature: String = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyA1IBre83zPx_FOfp-aGOk_HXHUZyr9Tfo',
      authDomain: 'ng-http-60353.firebaseapp.com'
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
