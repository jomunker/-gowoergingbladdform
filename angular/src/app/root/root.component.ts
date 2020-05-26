import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare function io(): any;
import { ModulVerarbeitungService } from '../modul-verarbeitung/modul-verarbeitung.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})

export class RootComponent implements OnInit {
  title = 'coworkingplatform';
  msgArray = [];
  socket = io();

  constructor(private http: HttpClient, public modulVA: ModulVerarbeitungService) {}

  ngOnInit() {
    //start socket.io
    io();

    //wenn eine socket-Nachricht reinkommt..
    this.socket.on('chat message', (msg) => {
      this.msgArrayPush(msg);
    });
  }

  setMSGArray(array: Array<any>){
    this.msgArray = array;
  }

  msgArrayPush(msg) {
    this.msgArray.push(msg);

    const input:any = document.getElementById("input")
    input.value = "";

  }

  onSend(input: String) {
    this.socket.emit('chat message', (input));
  }

  loadDB(){
    const option = {
      method : 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }

    this.http.post('/api/all',option).subscribe(response => {
      let data: any= response;
      console.log(data);
      let newMSGArray: Array<String> = [];

      for(let i = 0; i < data.length ;i++ ){
        newMSGArray.push(data[i].message);
      }
      this.setMSGArray(newMSGArray)
    });

  }
}
