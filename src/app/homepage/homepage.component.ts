import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { FirebaseService } from '../firebase-service/firebase.service';
import { GoogleUser } from '../models/GoogleUser';
import { Note } from '../models/Note';

export type List<T> = {
  title: string,
  list: T[],
  isToday?: boolean
}

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
  notes: List<Note>[] = []
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

    //this.firebaseService.saveNote(newNote);
  }

  getNotes() {

    this.firebaseService.getUserNotesSub(this.googleUser.user_id)
    .subscribe((notes) => {
      this.notes = []
      let today: Date = new Date(new Date().setHours(0, 0, 0));
      
      let todayNotes: List<Note>;
      let nonTodayNotes: List<Note>;

      todayNotes = {
        title: 'Today',
        list: notes.filter((v) => this.compareDate(new Date(v.final_date), today)),
        isToday: true
      }

      this.notes.push(todayNotes);

      nonTodayNotes = {
        title: 'Workspace',
        list: notes.filter((v) => !this.compareDate(new Date(v.final_date), today))
      }

      this.notes.push(nonTodayNotes);
      this.notesCount = notes?.length || 0
      this.selectedTasks = []
      this.loading = false
    }, 
    (err) => {
      this.loading = false
      this.selectedTasks = []
    });
  }

  taskCheck(id: string) {
    this.selectedTasks.push(id);
  }

  taskUnCheck(id: string) {
    this.selectedTasks = this.selectedTasks.filter(i => i != id)
  }

  detail(note: Note){
    this.router.navigate([`note-detail`, { id: note.uuid }])
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

  compareDate(a: Date, b: Date): boolean {
    if (!a && !b) return true
    if (!a || !b) return false

    a = new Date(a.getFullYear(), a.getMonth(), a.getDate());
    b = new Date(b.getFullYear(), b.getMonth(), b.getDate());
    return a.getTime() == b.getTime()
  }

}
