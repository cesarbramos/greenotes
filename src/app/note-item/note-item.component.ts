import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss']
})
export class NoteItemComponent implements OnInit {

  selected: boolean = false

  @Input()
  value: any

  @Input()
  title: string

  @Input()
  date: Date | string

  @Output()
  onUncheck: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onCheck: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onSelect: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {}

  check(val: boolean) {
    this.selected = val;
    if (val) this.onCheck.emit(this.value)
    else this.onUncheck.emit(this.value)
  }

  select() {
    this.onSelect.emit()
  }

}
