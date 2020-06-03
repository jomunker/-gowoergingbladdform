import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare function io(): any;

import { CanvasModule } from '../../interfaces/canvasModule';


@Injectable({
  providedIn: 'root'
})
export class CanvasModuleService {

  // public modules: Module[] = [];
  socket = io();
  // public module: Module;

  constructor(private http: HttpClient) {

    // this.module = {
    //   id: '',
    //   idHTML: '',
    //   type: '',
    //   position: { x: null, y: null, height: null, width: null },
    //   content: ''
    // }
  }

  ngOnInit() {
  }

  editModule(object) {
    this.socket.emit('module edited', (object));
  }

  //when this client provokes a delete
  moduleDelete(deleteObject){
    this.socket.emit('delete', (deleteObject));
  }

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
