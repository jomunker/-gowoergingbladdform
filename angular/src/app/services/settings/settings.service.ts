import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Settings} from "../../interfaces/settings";

declare function io(): any;

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public settings: Settings = {
    canvasWidth: 0,
    canvasHeight: 0,
    boardName: '',
    _id: undefined,
  }
  socket = io();
  zoomValue: number = 1;

  constructor(private http: HttpClient) {}


  //loads settings
  loadSettings() {
    const option = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }
    return new Promise<Settings>(resolve => {
      this.http.post('/api/preferences', option).subscribe(response => {
        // type change object(which is an array actually) -> any
        resolve(response[0]);
      });
    })
  }

  load() {
    //async function
    this.loadSettings().then(res => {
      this.settings = res
    });
  }

  triggerSettings(width: number, height: number) {
    // this.socket.emit("settings", {width, height})
    this.socket.emit("set canvas", {width, height})

  }

  triggerBoardName(name: string) {
    this.socket.emit("set boardname", {name})
  }

  setZoomValue(value) {
    this.zoomValue = value;
  }
}
