import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare function io(): any;

interface module {
  id: string;
  idHTML: number; //count
  type: string; //category
  position: {
    x: number,
    y: number,
    width: number,
    height: number
  };
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModulVerarbeitungService{

  socket = io();
  constructor(private http: HttpClient) {}

  moduleDelete(object: module){
    this.socket.emit('delete', (object));
  }

}
