import { Injectable } from '@angular/core';
declare function io(): any;

import { CanvasModule } from '../../interfaces/canvasModule';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CanvasModuleService {
  socket = io();

  public moduleArray = [];

  constructor(private http: HttpClient) {
    this.loadDB();
  }

  ngOnInit() {

    this.socket.on('new doc', (module) => {
      this.moduleArray.push(module);
    });

    // this.socket.on('module edited', (moduleEdit) => {
    //   // search and replace the edited object in the modules array

    //   // @ts-ignore
    //   const replaceObject : EntryObject = ArrayChecksService.checkIfEntriesExists(this.moduleArray, moduleEdit)

    //   if (replaceObject.exists) {
    //     this.moduleArray.splice(replaceObject.position, 1, moduleEdit)
    //   } else {
    //     console.log(JSON.stringify(moduleEdit) + "can not be edited")
    //   }
    // });

    this.socket.on('delete', (moduleDelete) => {
      //find the object to delete, if its exists delete it from the array

      // @ts-ignore
      const deleteObject: EntryObject = ArrayChecksService.checkIfEntriesExists(this.moduleArray, object)

      if (deleteObject.exists){
        this.moduleArray.splice(deleteObject.position, 1)
      } else {
        console.log(JSON.stringify(moduleDelete) + "can not be deleted")
      }
    });
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
    console.log(obj);
    this.socket.emit('new object', obj);
  }

  moduleEdit(object: CanvasModule) {
    // object.content = object.content + " - edited"
    console.log(object)
    this.socket.emit('module edited', (object));
  }

  //when this client provokes a delete
  moduleDelete(deleteObject) {
    this.socket.emit('delete', (deleteObject));
  }

  loadDB() {
    console.log("DB loaded");
    const option = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }

    this.http.post('/api/all',option).subscribe(response => {
      //type change object(which is an array actually) -> any
      let data: any = response;
      let newDisplayedArray: Array<String> = [];

      //go to the whole array and split each item into these two new Arrays
      for(let i = 0; i < data.length ;i++ ){
        newDisplayedArray.push(data[i]);
      }
      this.moduleArray = newDisplayedArray;
      console.log(this.moduleArray);
    });
  }
}
