import { Component, NgZone, OnInit } from '@angular/core';
import { Network } from '@capacitor/network';
import { StatusBar, Style } from '@capacitor/status-bar';
import * as firebase from 'firebase';

export type NetworkStatus = 'Online' | 'Offline';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GreeNotes';
  networkStatus: NetworkStatus = 'Offline';

  firebaseConfig: Object = {
    apiKey: "AIzaSyDAyLaTR8ab2kDyb3MUV1rB_YUQheSziAI",
    authDomain: "greenote-38189.firebaseapp.com",
    projectId: "greenote-38189",
    storageBucket: "greenote-38189.appspot.com",
    messagingSenderId: "446637628119",
    appId: "1:446637628119:web:fdf0453db94a9475f22e92",
    measurementId: "G-JJ17QR3N28"
  }

  constructor(private zone: NgZone){
    window.screen.orientation.lock('portrait');

    firebase.default.initializeApp(this.firebaseConfig)
    firebase.default.analytics()
  }

  async ngOnInit(){

    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({color: '#D9D9D9'});

    Network.addListener('networkStatusChange', (status) => {
      this.zone.run(() => {
        this.networkStatus = status.connected ? 'Online' : 'Offline'
      })
    })
  }

}
