import { Injectable } from '@angular/core';
import { CanvasModule } from '../interfaces/canvasmodule';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
declare function io(): any;

@Injectable({
  providedIn: 'root'
})
export class CanvasModuleService {

  socket = io();

  constructor(private http: HttpClient) { }

  moduleCreate(): void{
    let id = Date.now().toString();
    let obj: CanvasModule = {
      _id: id,
      idHTML: 1,
      type: 'type',
      position: {
        x: 1,
        y: 1,
        width: 1,
        height: 1
      },
      content: 'content'
    };

    this.socket.emit('new object', obj);    
  }
}
