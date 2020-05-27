import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CanvasModule} from "../interfaces/canvas-module";
declare function io(): any;



@Injectable({
  providedIn: 'root'
})
export class ModulVerarbeitungService{

  socket = io();
  constructor(private http: HttpClient) {}

  moduleDelete(object: CanvasModule){
    this.socket.emit('delete', (object));
  }

}
