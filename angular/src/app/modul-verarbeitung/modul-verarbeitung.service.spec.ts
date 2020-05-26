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

  describe('moduleDelete()', () => {
    it('should throw connection error', () => {

      const object = {
        "id": "auozhhj21^^12",
        "idHTML": 1,
        "type": "text",
        "position": {"x": 100, "y": 100, "width": 20, "height": 20},
        "content": "hello world"
      }
      const dummy = {"test": 1234}


      service.moduleDelete(object).subscribe(response => {
        expect(response).toEqual(dummy);
      });

      const req = httpMock.expectOne(`/delete`);
      expect(req.request.method).toBe("POST");
      req.flush(dummy);
      httpMock.verify();
    })
  })



});





