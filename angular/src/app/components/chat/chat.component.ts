import {Component, OnInit} from '@angular/core';
import {RootComponent} from '../root/root.component';
import {ChatService} from "../../services/chat/chat.service";
import {ChatMsg} from "../../interfaces/chat-message";

declare function io(): any;


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  opened = false;
  socket = io()

  constructor(public chatService: ChatService, public rootComponent: RootComponent) {}

  ngOnInit() {
    this.socket.on('new chat message', (msg) => {
      this.chatService.chatRecordPush(msg)
    });

    this.socket.on('delete chat message', (object) => {
      //find the object to delete, if its exists delete it from the array
      this.chatService.chatRecordSplice(object)
    });
  }

  onSend(msg: string) {
    if (msg != ""){
      this.chatService.msgCreate(msg);

      //clear the input field
      const input: any = document.getElementById("input")
      input.value = "";
    }

  }

  onDelete(msg: ChatMsg) {
    this.chatService.msgDelete(msg);
  }
}
