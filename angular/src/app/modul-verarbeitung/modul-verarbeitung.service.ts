import { Injectable } from '@angular/core';
import { Canvasmodule } from '../interfaces/canvasmodule';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
declare function io(): any;

@Injectable({
  providedIn: 'root'
})
export class ModulVerarbeitungService {

  socket = io();

  public canvasmodules: Canvasmodule[] = [];

  constructor(private http: HttpClient) { }

  moduleCreate(): void{
    let id = Date.now();
    let obj: Canvasmodule = {
      id: id.toString(),
      name: 'name'
    };

    this.socket.emit('new object', obj);
    this.canvasmodules.push(obj);
    
    // console.log(obj);
  }
}
