import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { FirebaseService } from '../firebase-service/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ AuthService ]
})
export class LoginComponent implements OnInit {

  loading: boolean = false

  constructor(private router: Router, public service: AuthService, private firebaseService: FirebaseService) {
    if (!this.service.isExpired) {
      this.home()
    }
  }

  ngOnInit(): void {}

  home() {
    this.router.navigate(['home'])
  }

  async googleSignIn() {
    this.loading = true;

    this.service.googleSignIn()
    .then((user) => {

      this.firebaseService.setUser(user).then(() => {
        this.loading = false;
        this.home();
        
      });
    })
  }

}
