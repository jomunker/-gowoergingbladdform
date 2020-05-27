import { Injectable } from '@angular/core';
import {CanvasModule} from "../interfaces/canvas-module";

@Injectable({
  providedIn: 'root'
})
export class ArrayChecksService {

  constructor() { }

  static checkIfEntriesExists(array: Array<CanvasModule>, object: object){
    let exists = false;
    array.forEach((element) => {
      if (JSON.stringify(element) === JSON.stringify(object)){
        exists = true;
      }
    })
    return exists;
  }
}
