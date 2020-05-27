import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare function io(): any;

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})

export class RootComponent implements OnInit {
  title = 'coworkingplatform';
  msgArray = [];
  socket = io();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    //when any other client pushes a message
    this.socket.on('chat message', (msg) => {
      this.msgArrayPush(msg);
    });

    //when any other client provokes a delete
    this.socket.on('delete', (object) => {
      //find and delete the object of the modules.array
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



  //when this client pushes a message
  onSend(input: string) {
    this.socket.emit('chat message', (input));
  }

  //when this client provokes a delete
  onDelete(msg: string){
    const deleteObject = JSON.parse(msg)
    this.socket.emit('delete', (deleteObject));
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
        newMSGArray.push(JSON.stringify(data[i]));
      }
      this.setMSGArray(newMSGArray)
    });

  }
}
