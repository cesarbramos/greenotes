import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ AuthService ]
})
export class LoginComponent implements OnInit {

  loading: boolean = false

  constructor(private router: Router, public service: AuthService) {
    if (!this.service.isExpired) {
      this.home()
    }
  }

  ngOnInit(): void {}

  home() {
    this.router.navigate(['home'])
  }

  googleSignIn() {
    this.loading = true;
    this.service.googleSignIn()
    .then((res) => {
      this.home();
    })
    .finally(() => {
      this.loading = false;
    })
  }

}
