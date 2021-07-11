import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusService } from '../status-service/status.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  date: Date = new Date()

  constructor(private router: Router, private statusBar: StatusService) { }

  ngOnInit(): void {
    this.statusBar.turnGreen()
  }

  ngOnDestroy(): void {
    this.statusBar.turnGray()
  }

  back() {
    this.router.navigate(['note-detail'])
  }

}
