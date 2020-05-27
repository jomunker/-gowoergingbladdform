import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArrayChecksService } from '../array-checks/array-checks.service';
declare function io(): any;

interface EntrieObject {
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
  displayedArray = [];
  objectArray = [];
  socket = io();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    //when any other client pushes a message
    this.socket.on('chat message', (msg) => {
      this.arraysPush(msg);
    });

    //when any other client provokes a delete
    this.socket.on('delete', (object) => {
      //find the object to delete, if its exists delete it from the array

      // @ts-ignore
      const deleteObject: EntrieObject = ArrayChecksService.checkIfEntriesExists(this.objectArray, object)

      if (deleteObject.exists){
        this.displayedArray.splice(deleteObject.position, 1)
        this.objectArray.splice(deleteObject.position, 1)
      } else {
        console.log(JSON.stringify(object) + "can not be deleted because it is not in the array")
      }
    });
  }

  arraysPush(input){
    this.displayedArray.push(JSON.stringify(input));
    this.objectArray.push(input);
  }

  //when this client pushes a message
  onSend(msg: string) {
    this.socket.emit('chat message', (msg));

    //clear the input field
    const input:any = document.getElementById("input")
    input.value = "";
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
      //type change object(which is an array acutally) -> any
      let data: any = response;
      let newDisplayedArray: Array<String> = [];
      let newObjectArray: Array<String> = [];

      //go to the whole array and split each item into these two new Arrays
      for(let i = 0; i < data.length ;i++ ){
        newDisplayedArray.push(JSON.stringify(data[i]));
        newObjectArray.push(data[i]);
      }

      this.displayedArray = newDisplayedArray;
      this.objectArray = newObjectArray;
    });
  }
}
