import { Injectable } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor() { }

  async turnGray(): Promise<void> {
    try {
      await StatusBar.setStyle({ style: Style.Light });
      await StatusBar.setBackgroundColor({color: '#f7f7f7'});
    } catch (e) {}
  }

  async turnGreen(): Promise<any> {
    try {
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({color: '#1c976a'});
    } catch (e) { }
  }

}
