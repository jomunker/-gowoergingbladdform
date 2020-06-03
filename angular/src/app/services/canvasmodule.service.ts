import { Injectable } from '@angular/core';
declare function io(): any;

import { CanvasModule } from '../interfaces/canvasmodule';


@Injectable({
  providedIn: 'root'
})
export class CanvasModuleService {
  socket = io();

  constructor() {
  }

  moduleCreate(content: string): void {
    const obj: CanvasModule = {
      _id: undefined, //defined from database
      idHTML: 1,
      type: 'type',
      position: {
        x: 1,
        y: 1,
        width: 1,
        height: 1
      },
      content: content,
    };

    this.socket.emit('new object', obj);
  }

  moduleEdit(object: CanvasModule) {
    object.content = object.content + " - edited"
    console.log(object)
    this.socket.emit('module edited', (object));
  }

  //when this client provokes a delete
  moduleDelete(deleteObject) {
    this.socket.emit('delete', (deleteObject));
  }
}
