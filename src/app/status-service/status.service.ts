import { Injectable } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor() { }

  async turnGray(): Promise<void> {
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({color: '#f7f7f7'});
  }

  async turnGreen(): Promise<any> {
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({color: '#1c976a'});
  }

}
