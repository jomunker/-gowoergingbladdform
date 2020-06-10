import { Injectable } from '@angular/core';
declare function io(): any;

import { CanvasModule } from '../../interfaces/canvasModule';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CanvasModuleService {
  socket = io();

  moduleArray: Array<CanvasModule> = [];

  constructor(private http: HttpClient) {
    this.loadDB();
  }

  ngOnInit() {

    this.socket.on('new doc', (module) => {
      this.moduleArray.push(module);
    });

    // this.socket.on('edited', (edit) => {
    //   console.log("Module edited");

    //   // for (let i = 0; i < this.moduleArray.length; i++) {
    //   //   const module = this.moduleArray[i];
    //   //   console.log(module);
    //   //   if (module.id == edit.id) {
    //   //     console.log(module.id)
    //   //     this.moduleArray.splice(i, 1, edit);
    //   //   }
    //   // }
    // });

    // this.socket.on('deleteModule', (moduleDelete) => {

    //   console.log("Deleted");

    //   for (let i = 0; i < this.moduleArray.length; i++) {
    //     const module = this.moduleArray[i];
    //     console.log(module);
    //     if (module.id == moduleDelete.id) {
    //       console.log(module.id)
    //       this.moduleArray.splice(i, 1);
    //     } else {
    //       console.log("can't be deleted");
    //     }
    //   }
    // });
  }

  moduleCreate(content: string): void {
    const obj: CanvasModule = {
      _id: undefined, //defined from database
      idHTML: 1,
      type: 'doc',
      position: {
        x: 1,
        y: 1,
        width: 1,
        height: 1
      },
      content: content,
    };
    console.log(obj);
    this.socket.emit('new object', obj);
  }

  moduleEdit(object) {
    // object.content = object.content + " - edited"

    console.log(this.moduleArray);
    this.socket.emit('module edited', (object));
  }

  moduleArrayEdit(object) {
    for (let i = 0; i < this.moduleArray.length; i++) {
      const module = this.moduleArray[i];
      if (module._id == object._id) {
        console.log(object._id)
        this.moduleArray.splice(i, 1, object);
        console.log(this.moduleArray[i])
      }
    }
  }

  //when this client provokes a delete
  moduleDelete(deleteObject) {
    this.socket.emit('delete', (deleteObject));
  }

  moduleArrayDelete(object) {
    for (let i = 0; i < this.moduleArray.length; i++) {
      const module = this.moduleArray[i];
      console.log(module);
      if (module._id == object._id) {
        console.log(this.moduleArray[i]);
        this.moduleArray.splice(i, 1);
      }
    }
  }

  loadDB() {

    const option = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }

    this.http.post('/api/modules', option).subscribe(response => {
      //type change object(which is an array actually) -> any
      let data: any = response;
      let newDisplayedArray: Array<CanvasModule> = [];

      //go to the whole array and split each item into these two new Arrays
      for (let i = 0; i < data.length; i++) {
        newDisplayedArray.push(data[i]);
      }
      this.moduleArray = newDisplayedArray;
      console.log(this.moduleArray);
    });
    console.log("DB loaded");
  }
}
