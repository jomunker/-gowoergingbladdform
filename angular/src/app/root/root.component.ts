import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModuleService } from '../services/module.service';
import { Module } from '../interfaces/module';


declare function io(): any;

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})

export class RootComponent implements OnInit {
  title = 'coworkingplatform';
  objectArray = [];
  //public objectArray: Module[] = [];

  socket = io();
  
   object:Module = {
    id: "1",
    idHTML: "0",
    type: "0",
    position: {x: 0,y: 0,width: 0,height:0},
    content: "0",
  }

  constructor(private http: HttpClient, public moduleService: ModuleService) { }

  ngOnInit() {
    //start socket.io
    io();

    //wenn eine socket-Nachricht reinkommt..
    this.socket.on('chat message', (msg) => {
      this.ArrayPush(msg);
    });

    // if socket recieves a edited object
    this.socket.on('module edited', (moduleEdit) => {
      // search and replace the edited object in the modules array
      for (let i = 0; i < this.objectArray.length; i++) {
        const module = this.objectArray[i];
        console.log(module);
        if (module.id == moduleEdit.id) {
          this.objectArray.splice(i, 1, moduleEdit);
        }
      }
    });
  }

  setObjectArray(array: Array<any>) {
    this.objectArray = array;
  }

  ArrayPush(object) {
    this.objectArray.push(object);

    const input: any = document.getElementById("input")
    input.value = "";

  }

  onSend(input: String) {
    this.socket.emit('chat message', (input));
  }

  loadDB() {
    const option = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }

    this.http.post('/api/all', option).subscribe(response => {
      let data: any = response;
      console.log(data);
      let newObjectArray: Array<String> = [];

      for (let i = 0; i < data.length; i++) {
        newObjectArray.push(data[i]);
      }
      this.setObjectArray(newObjectArray)
    });

  }
}
