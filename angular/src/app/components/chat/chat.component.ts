import {Component, OnInit} from '@angular/core';
import { RootComponent } from '../root/root.component';
import {ChatService} from "../../services/chat/chat.service";

declare function io(): any;


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  opened = false;

  title = 'coworkingplatform';
  socket = io()

  constructor( public chatService: ChatService, public rootComponent: RootComponent) {
  }

    ngOnInit() {

      this.socket.on('new chat message', (msg) => {
        this.chatService.recordPush(msg)
      });


      /*this.socket.on('delete', (object) => {
        //find the object to delete, if its exists delete it from the array

        // @ts-ignore
        const deleteObject: EntryObject = ArrayChecksService.checkIfEntriesExists(this.moduleArray, object)

        if (deleteObject.exists){
          this.moduleArray.splice(deleteObject.position, 1)
        } else {
          console.log(JSON.stringify(object) + "can not be deleted")
        }
      });*/
    }


    //when this client pushes a message
    onSend(msg: string) {
      this.chatService.msgCreate(msg);

      //clear the input field
      const input: any = document.getElementById("input")
      input.value = "";
    }

    loadDB() {
      this.chatService.getChat();
    }

}
