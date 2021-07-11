import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteTransactionService {

  private uuidKey: string
  private dateKey: string

  constructor() { 
    this.uuidKey = 'note_transactional_uuid'
    this.dateKey = 'note_transactional_date'
  }

  get uuid(): string {
    return localStorage.getItem(this.uuidKey)
  }

  set uuid(val: string) {
    localStorage.setItem(this.uuidKey, val);
  }

  get date(): Date {
    let date = Number(localStorage.getItem(this.dateKey));
    return date ? new Date(date) : null;
  }

  set date(value: Date) {
    localStorage.setItem(this.dateKey, JSON.stringify(value.getTime()));
  }

  removeDate(): void {
    localStorage.removeItem(this.dateKey)
  }

}
