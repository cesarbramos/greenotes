import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  back() {
    history.back()
  }

}
