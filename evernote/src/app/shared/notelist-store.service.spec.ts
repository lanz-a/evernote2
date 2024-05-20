import { TestBed } from '@angular/core/testing';

import { NotelistStoreService } from './notelist-store.service';

describe('NotelistStoreService', () => {
  let service: NotelistStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotelistStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
