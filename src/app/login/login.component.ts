import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ LoginService ]
})
export class LoginComponent implements OnInit {

  result: any;

  constructor(private router: Router, public service: LoginService) {
    if (!this.service.isExpired) {
      this.home()
    }
  }

  ngOnInit(): void {}

  home() {
    this.router.navigate(['home'])
  }

  googleSignIn() {
    this.service.googleSignIn().then((res) => {
      this.result = res;
      this.home();
    }).catch(err => this.result = JSON.stringify(err))
  }

}
