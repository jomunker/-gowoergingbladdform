import { Injectable } from '@angular/core';
import {CanvasModule} from "../interfaces/canvas-module";

@Injectable({
  providedIn: 'root'
})
export class ArrayChecksService {

  constructor() { }

  static checkIfEntriesExists(array: Array<CanvasModule>, object: object):object{
    let exists:object = {
      "exists": false,
      "position": undefined,
    };
    for(let i = 0; i < array.length; i++){
      if (JSON.stringify(array[i]) === JSON.stringify(object)){
        exists = {"exists": true,"position": i};
      }
    }
    return exists;
  }
}
