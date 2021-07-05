import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { FirebaseService } from '../firebase-service/firebase.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  providers: [ AuthService ]
})
export class HomepageComponent implements OnInit {

  today: Date;
  loading: boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.today = new Date()
  }

}
