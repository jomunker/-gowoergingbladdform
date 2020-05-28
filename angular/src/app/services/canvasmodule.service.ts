import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare function io(): any;

import { CanvasModule } from '../interfaces/canvasmodule';


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
    // Start socket.io
    io();

  }


  editModule(object) {

    this.socket.emit('module edited', (object));

  }

}
