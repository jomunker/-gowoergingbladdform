import { Injectable } from '@angular/core';
import {CanvasModule} from "../../interfaces/canvasModule";
import {HttpClient} from "@angular/common/http";
declare function io(): any;

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket = io();
  chatRecord:Array<any> = [];
  constructor(private http: HttpClient,) { }

  msgCreate(content: string): void {
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

    this.socket.emit('new chat message', obj);
  }

  recordPush(msg){
    this.chatRecord.push(msg);
  }

  getChat(){
    const option = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }

    this.http.post('/api/chat',option).subscribe(response => {
      //type change object(which is an array actually) -> any
      let data: any = response;
      let newDisplayedArray: Array<String> = [];

      //go to the whole array and split each item into these two new Arrays
      for(let i = 0; i < data.length ;i++ ){
        newDisplayedArray.push(data[i]);
      }
      this.chatRecord = newDisplayedArray;
    });
  }
}
