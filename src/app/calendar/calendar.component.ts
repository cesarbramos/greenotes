import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteTransactionService } from '../note-detail/note-transaction.service';
import { StatusService } from '../status-service/status.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  date: Date = new Date()

  constructor(
    private router: Router, 
    private statusBar: StatusService, 
    private transaction: NoteTransactionService) { }

  ngOnInit(): void {
    this.statusBar.turnGreen()
    if (this.transaction.date) this.date = this.transaction.date;
  }

  ngOnDestroy(): void {
    this.statusBar.turnGray()
  }

  back() {
    this.transaction.date = this.date
    this.router.navigate(['note-detail', { id: this.transaction.uuid }])
  }

}
