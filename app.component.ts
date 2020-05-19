import { Component } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyAadkfMBFNUfIa5v_zoQRlPReuzsuSbS1w',
      authDomain: 'http-client-demo-b9365.firebaseapp.com',
      databaseURL: 'https://http-client-demo-b9365.firebaseio.com',
      projectId: 'http-client-demo-b9365',
      storageBucket: 'http-client-demo-b9365.appspot.com',
      messagingSenderId: '1013065720183',
      // appId: '1:1013065720183:web:a340bfcfbb4462eea38172',
      // measurementId: 'G-FP1KJBKETC'
    };
    firebase.initializeApp(firebaseConfig);
  }
}
