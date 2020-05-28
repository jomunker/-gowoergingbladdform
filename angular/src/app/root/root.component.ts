import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanvasModuleService } from '../services/canvasmodule.service';
import { CanvasModule } from '../interfaces/canvasmodule';


declare function io(): any;

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})

export class RootComponent implements OnInit {
  title = 'coworkingplatform';
  moduleArray = [];
  //public moduleArray: Module[] = [];

  socket = io();
  
   object:CanvasModule = {
    id: "1",
    idHTML: "4",
    type: "4",
    position: {x: 0,y: 0,width: 0,height:0},
    content: "4",
  }

  constructor(private http: HttpClient, public canvasmoduleservice: CanvasModuleService) { }

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
      for (let i = 0; i < this.moduleArray.length; i++) {
        const module = this.moduleArray[i];
        console.log(module);
        if (module.id == moduleEdit.id) {
          this.moduleArray.splice(i, 1, moduleEdit);
        }
      }
    });
  }

  setmoduleArray(array: Array<any>) {
    this.moduleArray = array;
  }

  ArrayPush(object) {
    this.moduleArray.push(object);

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
      let newmoduleArray: Array<String> = [];

      for (let i = 0; i < data.length; i++) {
        newmoduleArray.push(data[i]);
      }
      this.setmoduleArray(newmoduleArray)
    });

  }
}
