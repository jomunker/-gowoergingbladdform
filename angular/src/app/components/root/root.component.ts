import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ArrayChecksService} from '../../services/array-checks.service';
import {CanvasModuleService} from '../../services/canvasmodule.service';
import {CanvasModule} from '../../interfaces/canvasModule';

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
  title = 'coworkingplatform';
  moduleArray = [];
  socket = io()

  constructor(private http: HttpClient, public canvasmoduleservice: CanvasModuleService) {
  }

  ngOnInit() {

    this.socket.on('chat message', (msg) => {
      this.moduleArray.push(msg);
    });

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
    this.canvasmoduleservice.moduleCreate(msg);

    //clear the input field
    const input: any = document.getElementById("input")
    input.value = "";
  }

  loadDB() {
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
    });
  }
}