import { TestBed } from '@angular/core/testing';

import { CanvasModuleService } from './canvasmodules.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

declare function io(): any;

describe('canvasmoduleService', () => {
  let service: CanvasModuleService;
  let httpMock: HttpTestingController;
  let socket = io();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CanvasModuleService]
    });
    service = TestBed.inject(CanvasModuleService);
    httpMock = TestBed.inject(HttpTestingController);
    socket = TestBed.inject(socket);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
