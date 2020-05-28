import { TestBed } from '@angular/core/testing';

import { CanvasModuleService } from './canvasmodule.service';
import { CanvasModule } from '../interfaces/canvasmodule';

describe('CanvasModuleService', () => {
  let service: CanvasModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
