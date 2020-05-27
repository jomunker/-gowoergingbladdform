import { TestBed } from '@angular/core/testing';

import { ArrayChecksService } from './array-checks.service';
import {CanvasModule} from "../interfaces/canvas-module";

describe('ArrayChecksService', () => {
  let service: ArrayChecksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrayChecksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('CheckIfEntrieExists in Array', () => {
  it('should be true', () => {
    const inputArray: Array<CanvasModule> = [
      {
        _id: "123",
        idHTML: 1, //count
        type: "text", //category
        position: {
          x: 1,
          y: 1,
          width: 2,
          height: 2
        },
        content: "test"
      },
      {
        _id: "456",
        idHTML: 2, //count
        type: "text2", //category
        position: {
          x: 1,
          y: 1,
          width: 2,
          height: 2
        },
        content: "test2"
      }
    ]
    const checkObject: CanvasModule = {
      _id: "456",
      idHTML: 2, //count
      type: "text2", //category
      position: {
        x: 1,
        y: 1,
        width: 2,
        height: 2
      },
      content: "test2"
    }

    expect(ArrayChecksService.checkIfEntriesExists(inputArray, checkObject)).toBeTrue()
  });

  it('should be false', () => {
    const inputArray: Array<CanvasModule> = [
      {
        _id: "123",
        idHTML: 1, //count
        type: "text", //category
        position: {
          x: 1,
          y: 1,
          width: 2,
          height: 2
        },
        content: "test"
      },
      {
        _id: "456",
        idHTML: 2, //count
        type: "text2", //category
        position: {
          x: 1,
          y: 1,
          width: 2,
          height: 2
        },
        content: "test2"
      }
    ]
    const checkObject: CanvasModule = {
      _id: "465",
      idHTML: 2, //count
      type: "text2", //category
      position: {
        x: 1,
        y: 1,
        width: 2,
        height: 2
      },
      content: "test2"
    }

    expect(ArrayChecksService.checkIfEntriesExists(inputArray, checkObject)).toBeFalse()
  });
});

