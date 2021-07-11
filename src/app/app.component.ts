import { Component, NgZone, OnInit } from '@angular/core';
import { Network } from '@capacitor/network';
import * as firebase from 'firebase';
import { firebaseConfig } from './firebaseConfig';
import { StatusService } from './status-service/status.service';

export type NetworkStatus = 'Online' | 'Offline';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GreeNotes';
  networkStatus: NetworkStatus = 'Offline';

  constructor(private zone: NgZone, private statusService: StatusService){
    window.screen.orientation.lock('portrait');

    firebase.default.initializeApp(firebaseConfig)
    firebase.default.analytics()
  }

  ngOnInit(){
    this.statusService.turnGray();

    Network.addListener('networkStatusChange', (status) => {
      this.zone.run(() => {
        this.networkStatus = status.connected ? 'Online' : 'Offline'
      })
    })
  }

}
