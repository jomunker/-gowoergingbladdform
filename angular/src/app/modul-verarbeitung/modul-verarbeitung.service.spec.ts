import { TestBed } from '@angular/core/testing';

import { ModulVerarbeitungService } from './modul-verarbeitung.service';

describe('ModulVerarbeitungService', () => {
  let service: ModulVerarbeitungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModulVerarbeitungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
