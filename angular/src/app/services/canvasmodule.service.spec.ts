import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CanvasModuleService} from './canvas-module.service';

describe('ModulVerarbeitungService', () => {
  let service: CanvasModuleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CanvasModuleService]
    });
    service = TestBed.inject(CanvasModuleService);
    httpMock = TestBed.inject(HttpTestingController);
  });


});





