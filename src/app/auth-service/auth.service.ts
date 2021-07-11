import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { cfaSignIn, cfaSignOut } from 'capacitor-firebase-auth';
import { GoogleUser } from '../models/GoogleUser';
import { User } from '../models/User';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  get userId(): string {
    return this.getTokenData().user_id; 
  }

  getTokenData(): GoogleUser {
    return helper.decodeToken(this.googleToken);
  }

  removeGoogleToken() {
    localStorage.removeItem('google_token');
  }

  googleSignIn(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      cfaSignIn('google.com').subscribe((user) => {
        user.getIdToken().then((token) => {
          this.googleToken = token;
          resolve(this.GoogleUserToUser(this.getTokenData()));
        })
      }, (err) => reject(err));
    });
  }

  googleSignOut() {
    cfaSignOut().subscribe((o) => {
      this.removeGoogleToken()
      this.router.navigate(['login'])
    })
  }

  // Converters

  GoogleUserToUser(user: GoogleUser): User {
    return {
      id: user.user_id,
      last_login: new Date(),
      name: user.name,
      profile_picture: user.picture,
      google_sign: true,
    }
  }

}
