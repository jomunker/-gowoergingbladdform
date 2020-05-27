import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ModulVerarbeitungService} from './modul-verarbeitung.service';

describe('ModulVerarbeitungService', () => {
  let service: ModulVerarbeitungService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ModulVerarbeitungService]
    });
    service = TestBed.inject(ModulVerarbeitungService);
    httpMock = TestBed.inject(HttpTestingController);
  });


});





