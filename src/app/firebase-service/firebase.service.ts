import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';
import { Note } from '../models/Note';
import { User } from '../models/User';
import { UserNote } from '../models/UserNote';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnInit {

  get database() {
    return this.firebase.database;
  }

  constructor(private firebase: AngularFireDatabase, private authService: AuthService) { }

  ngOnInit() {}

  userRef(userId: string) {
    return this.database.ref(`user/${userId}`) 
  }

  userNoteRef(userId: string) {
    return this.database.ref(`user-notes/${userId}`)
  }

  noteRef(userId: string, noteId: string) {
    return this.database.ref(`user-notes/${userId}/${noteId}`)
  }

  setUser(user: User): Promise<any> {
    return this.userRef(user.id).set(user);
  }

  saveNote(note: Note) {
    let key: string = note.uuid;

    if (!key) {
      key = firebase.database().ref().child('user-notes').push().key;
      note.uuid = key;
    }

    note.author = this.authService.userId;
    note.final_date = note.final_date.toString()
    note.created_at = note.created_at.toString()
    note.initial_date = note.initial_date.toString()
    return this.noteRef(this.authService.userId, key).set(note)
  }

  /*getNote(userId: string, noteId: string): Promise<Note> {
    return new Promise<Note>((resolve, reject) => {
      this.noteRef(userId, noteId).once('value')
      .then(snap => resolve(snap.val()))
      .catch(err => reject(err))
    })
  } */

  getNote(noteId: string): Observable<Note> {
    return this.firebase.object<Note>(`user-notes/${this.authService.userId}/${noteId}`).valueChanges();
  }

  removeNote(userId: string, noteId: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.noteRef(userId, noteId).remove()
      .then(() => resolve())
      .catch(err => reject(err))
    })
  }

  removeNotes(userId: string, noteIds: string[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {

      if (!noteIds || noteIds.length == 0){
        resolve();
        return;
      }

      Promise.all( noteIds.map(id => this.noteRef(userId, id).remove()) )
      .then(() => resolve())
      .catch(err => reject(err))

    })
  }

  getUserNotes(userId: string): Promise<Note[]> {
    return new Promise<Note[]>((resolve, reject) => {
      this.userNoteRef(userId).once('value')
      .then(snap => resolve(this.userNoteToArray(snap.val())) )
      .catch(err => reject(err))
    })
  }

  getUserNotesSub(userId: string): Observable<Note[]> {
    return this.firebase.list<Note>(`user-notes/${userId}`).valueChanges()
  }

  private userNoteToArray(sn: UserNote): Note[] {
    // reduce((arr: any, v: any) => { arr.push(v[1]); return arr }, []);
    return Object.entries(sn).map((v: any) => v[1])
  }

}
