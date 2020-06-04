import { TestBed } from '@angular/core/testing';

import { ArrayChecksService } from './array-checks.service';
import {CanvasModule} from "../../interfaces/canvasModule";

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
  const inputArray: Array<CanvasModule> = [
    {
      _id: "123",
      idHTML: 0,
      type: "text",
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
      idHTML: 1,
      type: "text2",
      position: {
        x: 1,
        y: 1,
        width: 2,
        height: 2
      },
      content: "test2"
    }
    ]

  it('should be true', () => {
    const checkObject: CanvasModule = {
      _id: "456",
      idHTML: 1, //count
      type: "text2", //category
      position: {
        x: 1,
        y: 1,
        width: 2,
        height: 2
      },
      content: "test2"
    }
    expect(ArrayChecksService.checkIfEntriesExists(inputArray, checkObject)).toEqual({"exists": true, "position": 1})
  });

  it('should be false', () => {
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
    expect(ArrayChecksService.checkIfEntriesExists(inputArray, checkObject)).toEqual({"exists": false, "position": undefined})
  });

  it('should return object position 1', () => {
    const checkObject: CanvasModule = {
      _id: "123",
      idHTML: 0,
      type: "text",
      position: {
        x: 1,
        y: 1,
        width: 2,
        height: 2
      },
      content: "test"
    }
    expect(ArrayChecksService.checkIfEntriesExists(inputArray, checkObject)).toEqual({"exists": true, "position": 0})
  });
});

