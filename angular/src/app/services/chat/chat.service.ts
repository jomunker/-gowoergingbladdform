import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChatMsg} from "../../interfaces/chat-message"

declare function io(): any;

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket = io();
  chatRecord: Array<ChatMsg> = [];

  constructor(private http: HttpClient) {}

  msgCreate(content: string): void {
    //creates and spreads the new chat message
    const obj: ChatMsg = {
      _id: undefined, //defined from database
      message: content,
    };

    this.socket.emit('new chat message', obj);
  }

  msgDelete(msg: ChatMsg) {
    // spreads to dele message
    this.socket.emit('delete chat message', msg);
  }

  chatRecordPush(msg) {
    //adds another message to the chatRecord
    this.chatRecord.push(msg);
  }

  chatRecordSplice(msg) {
    //finds and deletes the chat message of the chatRecord
    for (let i = 0; i < this.chatRecord.length; i++) {
      if (this.chatRecord[i]._id == msg._id) {
        this.chatRecord.splice(i, 1);
      }
    }
  }

  getChat() {
    //loads the chatRecord via API-Call of the database
    const option = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }

    this.http.post('/api/chat', option).subscribe(response => {
      //type change object(which is an array actually) -> any
      let data: any = response;
      let newDisplayedArray: Array<ChatMsg> = [];

      //go to the whole array and split each item into these two new Arrays
      for (let i = 0; i < data.length; i++) {
        newDisplayedArray.push(data[i]);
      }
      this.chatRecord = newDisplayedArray;
    });
  }
}
