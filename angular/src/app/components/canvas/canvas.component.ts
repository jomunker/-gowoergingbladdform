import { Component, OnInit } from '@angular/core';
import { CanvasModule } from 'src/app/interfaces/canvasModule';
import { CanvasModuleService } from 'src/app/services/canvasmodule/canvasmodule.service';
import { ArrayChecksService } from '../../services/array-checks/array-checks.service';
import { CdkDragDrop, CdkDragEnd } from '@angular/cdk/drag-drop';
import {HttpClient} from "@angular/common/http";

declare function io(): any;


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  settings: object = {}
  socket = io();

  constructor(public canvasmoduleservice: CanvasModuleService, private http: HttpClient) { }


  ngOnInit() {

    this.canvasmoduleservice.loadModules();
    this.loadSettings();


    // listens to socket event 'editModule' and replaces module from moduleArray
    this.socket.on('new module', (newModule) => {
      this.canvasmoduleservice.moduleArrayPush(newModule);
      console.log("Module created.");
    });

    // listens to socket event 'editModule' and replaces module from moduleArray
    this.socket.on('editModule', (moduleEdit) => {
      this.canvasmoduleservice.moduleArrayEdit(moduleEdit);
      console.log("Module edited.");
    });

    // listens to socket event 'editModule' and splices module from modulesArray
    this.socket.on('deleteModule', (object) => {
      this.canvasmoduleservice.moduleArrayDelete(object);
      console.log("Module deleted.");
    });
  }

  // catches drag-event and updates the modules' position on the canvas
  dragEnd(event: CdkDragEnd, module) {
    console.log("drag");
    module.position.x += event.distance.x;
    module.position.y += event.distance.y;
    this.canvasmoduleservice.moduleEdit(module);
  }

  //loads settings
  loadSettings() {

    const option = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }

    this.http.post('/api/preferences', option).subscribe(response => {
      // type change object(which is an array actually) -> any

      this.settings = response[0];
      console.log(this.settings)
    });
    console.log("Settings loaded");
  }
}
