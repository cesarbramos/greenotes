import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/Operators';
import { FirebaseService } from '../firebase-service/firebase.service';
import { Note }  from '../models/Note'
import { NoteTransactionService } from './note-transaction.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit, AfterViewInit {

  isNew: boolean;

  uuid: string;
  note: Note;

  title: string;
  TITLE_MAX_LENGTH: number = 100;

  description: string;
  DESC_MAX_LENGTH: number = 2000;

  final_date: Date = null;

  constructor(
    private router: Router, 
    private acRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private firebaseService: FirebaseService,
    private transactionService: NoteTransactionService) { }

  @ViewChild('titleP', { static: true }) titleP: ElementRef<HTMLParagraphElement>
  @ViewChild('descriptionP', { static: true }) descriptionP: ElementRef<HTMLParagraphElement>

  get isValid(): boolean {
    return !!this.title || !!this.description; 
  }

  ngOnInit(): void {
    if (this.transactionService.date) this.final_date = this.transactionService.date;

    this.acRoute.params.subscribe((params) => {
      this.isNew = !params['id'];
      this.uuid = params['id'];

      if (!this.isNew) {
        this.firebaseService.getNote(this.uuid).subscribe((note) => {
          this.note = note;
          this.title = note.title;
          this.description = note.description;
          this.final_date = this.transactionService.date || new Date(note.final_date);
        });
      }
    });
  }

  ngAfterViewInit() {
    fromEvent(this.titleP.nativeElement, 'keydown')
    .pipe(filter((e: KeyboardEvent) => e.key == 'Enter'))
    .subscribe(e => {
      e.preventDefault();
      this.descriptionP.nativeElement.focus();
    });
  }

  back() {
    if (this.isValid) {
      this.createNote()
    }
    this.transactionService.removeDate()
    this.router.navigate(['home'])
  } 

  titleChange(value: string) {
    if (!value) return;
    if (value.length > this.TITLE_MAX_LENGTH){
      this.cdRef.detectChanges()
      this.title = this.title.slice(0, this.TITLE_MAX_LENGTH)
      setTimeout(() => this.moveCaret(this.titleP.nativeElement))
    }
  }

  descChange(value: string) {
    if (!value) return
    if (value.length > this.DESC_MAX_LENGTH) {
      this.cdRef.detectChanges()
      this.description = this.description.slice(0, this.DESC_MAX_LENGTH)
      setTimeout(() => this.moveCaret(this.descriptionP.nativeElement))
    }
  }

  moveCaret(el: HTMLElement) {
    let range = document.createRange();
    let pos = el.innerText.length;
    let sel = window.getSelection();
    range.setStart(el.childNodes[0], pos);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  calendar() {
    this.transactionService.uuid = this.uuid;
    if (this.final_date) this.transactionService.date = this.final_date;
    this.router.navigate(['calendar'])
  }

  createNote() {
    let uuid: string = this.isNew ? '': this.uuid;
      
    let newNote: Note = {
      uuid,
      author: '',
      title: this.title || 'Untitled',
      description: this.description || '',
      created_at: new Date(),
      initial_date: new Date(),
      final_date: this.final_date || new Date(),
      status: 'PENDING',
    }
    this.firebaseService.saveNote(newNote);
  }

}
