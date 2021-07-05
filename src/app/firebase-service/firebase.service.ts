import { Injectable, OnInit } from '@angular/core';
import firebase from 'firebase';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnInit {

  get database() {
    return firebase.database();
  }

  constructor() { }

  ngOnInit() {}

  setUser(user: User): Promise<any> {
    return this.database.ref(`user/${user.id}`).set(user);
  }

}
