import { Injectable } from '@angular/core';
import { cfaSignIn, cfaSignOut } from 'capacitor-firebase-auth';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router) { }

  get googleToken(): string {
    return localStorage.getItem('google_token');
  }

  set googleToken(value: string) {
    localStorage.setItem('google_token', value);
  }

  get haveBeenLogged(): boolean {
    if (this.googleToken) return true;
    return false;
  }

  get isExpired(): boolean {
    if (this.haveBeenLogged) {
      return helper.isTokenExpired(this.googleToken);
    }
    return true;
  }

  removeGoogleToken() {
    localStorage.removeItem('google_token');
  }

  googleSignIn(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cfaSignIn('google.com').subscribe((user) => {
        user.getIdToken().then((token) => {
          this.googleToken = token;
          resolve();
        });
      }, (err) => reject(err));
    });
  }

  googleSignOut() {
    cfaSignOut().subscribe((o) => {
      this.removeGoogleToken()
      this.router.navigate(['login'])
    })
  }
  
}
