import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CanvasModule} from "../interfaces/canvasModule";
declare function io(): any;



@Injectable({
  providedIn: 'root'
})
export class CanvasModuleService {

  socket = io();
  constructor(private http: HttpClient) {}

  //when this client provokes a delete
  moduleDelete(deleteObject){
    this.socket.emit('delete', (deleteObject));
  }

}
