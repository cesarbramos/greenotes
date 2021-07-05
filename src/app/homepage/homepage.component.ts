import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { FirebaseService } from '../firebase-service/firebase.service';
import { GoogleUser } from '../models/GoogleUser';
import { Note } from '../models/Note';
import { UserNote } from '../models/UserNote';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  providers: [ AuthService ]
})
export class HomepageComponent implements OnInit {

  today: Date
  loading: boolean = true
  googleUser: GoogleUser
  picture: string
  notes: Note[]
  notesCount: number = 0

  selectedTasks: string[] = []

  constructor(
    private authService: AuthService, 
    private firebaseService: FirebaseService,
    private router: Router
    ) { }

  get onSelection(): boolean {
    return this.selectedTasks?.length > 0 || false;
  }

  async ngOnInit() {
    this.today = new Date()
    this.googleUser = this.authService.getTokenData()
    this.picture = this.googleUser.picture;
    this.getNotes()
    
    let newNote: Note = {
      uuid: '',
      author: this.googleUser.user_id,
      created_at: new Date(),
      description: 'Description example',
      final_date: new Date(),
      initial_date: new Date(),
      status: 'PENDING',
      title: 'EXAMPLE TASK'
    }

    this.firebaseService.setNote( this.googleUser.user_id, newNote);
  }

  getNotes() {
    this.firebaseService.getUserNotes(this.googleUser.user_id).then(notes => {
      this.notes = notes;
      this.notesCount = notes?.length || 0
    }).finally(() => {
      this.selectedTasks = []
      this.loading = false
    })
  }

  taskCheck(id: string) {
    this.selectedTasks.push(id);
  }

  taskUnCheck(id: string) {
    this.selectedTasks = this.selectedTasks.filter(i => i != id)
  }

  btnAction() {
    if (this.onSelection) {
      this.loading = true;
      this.firebaseService.removeNotes(this.googleUser.user_id, this.selectedTasks)
      .catch(() => {
        console.error("Elimination error");
      })
      .finally(() => {
        this.getNotes()
        this.loading = false
      })
      return;
    }

    this.router.navigate(['note-detail'])
  }

}
