import { TestBed } from '@angular/core/testing';

import { NoteTransactionService } from './note-transaction.service';

describe('NoteTransactionService', () => {
  let service: NoteTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
