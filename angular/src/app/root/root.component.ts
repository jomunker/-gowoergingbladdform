import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ArrayChecksService} from '../services/array-checks.service';
import {CanvasModuleService} from '../services/canvasmodule.service';
import {CanvasModule} from '../interfaces/canvasModule';

declare function io(): any;

interface EntryObject {
  "exists": boolean,
  "position": number,
}

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})

export class RootComponent implements OnInit {
  opened = false;
  
  title = 'coworkingplatform';
  moduleArray = [];
  socket = io()

  object:CanvasModule = {
    _id: "1",
    idHTML: 4,
    type: "4",
    position: {x: 0,y: 0,width: 0,height:0},
    content: "4",
  }

  constructor(private http: HttpClient, public canvasmoduleservice: CanvasModuleService) {
  }

  ngOnInit() {
    //wenn eine socket-Nachricht reinkommt..
    this.socket.on('chat message', (msg) => {
      this.moduleArray.push(msg);
    });

    // if socket recieves a edited object
    this.socket.on('module edited', (moduleEdit) => {
      // search and replace the edited object in the modules array

      // @ts-ignore
      const replaceObject : EntryObject = ArrayChecksService.checkIfEntriesExists(this.moduleArray, moduleEdit)

      if (replaceObject.exists) {
        this.moduleArray.splice(replaceObject.position, 1, moduleEdit)
      } else {
        console.log(JSON.stringify(moduleEdit) + "can not be edited")
      }
    });

    //when any other client provokes a delete
    this.socket.on('delete', (object) => {
      //find the object to delete, if its exists delete it from the array

      // @ts-ignore
      const deleteObject: EntryObject = ArrayChecksService.checkIfEntriesExists(this.moduleArray, object)

      if (deleteObject.exists){
        this.moduleArray.splice(deleteObject.position, 1)
      } else {
        console.log(JSON.stringify(object) + "can not be deleted")
      }
    });
  }


  //when this client pushes a message
  onSend(msg: string) {
    this.socket.emit('chat message', (msg));

    //clear the input field
    const input: any = document.getElementById("input")
    input.value = "";
  }

  //when this client provokes a delete
  onDelete(msg) {
    this.canvasmoduleservice.moduleDelete(msg);
  }

  onEdit(msg) {
    this.canvasmoduleservice.editModule(msg);
  }


  loadDB() {
    const option = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }

    this.http.post('/api/all',option).subscribe(response => {
      //type change object(which is an array acutally) -> any
      let data: any = response;
      let newDisplayedArray: Array<String> = [];

      //go to the whole array and split each item into these two new Arrays
      for(let i = 0; i < data.length ;i++ ){
        newDisplayedArray.push(data[i]);
      }
      this.moduleArray = newDisplayedArray;
    });
  }
}
