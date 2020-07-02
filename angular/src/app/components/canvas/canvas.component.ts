import { Component, OnInit } from '@angular/core';
import { CanvasModuleService } from 'src/app/services/canvasmodule/canvasmodule.service';
import {HttpClient} from "@angular/common/http";
import {Settings} from "../../interfaces/settings";
import {CdkDragEnd} from '@angular/cdk/drag-drop';
import {SettingsService} from 'src/app/services/settings/settings.service';
declare function io(): any;


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  socket = io();

  constructor(public canvasmoduleservice: CanvasModuleService, private http: HttpClient, public settingsService: SettingsService) { }


  ngOnInit() {

    this.canvasmoduleservice.loadModules();
    this.settingsService.load();

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

    // listens to socket event 'setting' and adopts the new settings
    this.socket.on('set canvas', (object) => {
      this.settingsService.settings = object[0];
      console.log("settings adopted.");
    });
  }

  // catches drag-event and updates the modules' position on the canvas
  dragEnd(event: CdkDragEnd, module) {
    module.position.x += event.distance.x;
    module.position.y += event.distance.y;
    this.canvasmoduleservice.moduleEdit(module);
  }
}
