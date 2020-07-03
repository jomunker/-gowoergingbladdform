import {Component, OnInit} from '@angular/core';
import {CanvasModuleService} from 'src/app/services/canvasmodule/canvasmodule.service';
import {HttpClient} from "@angular/common/http";
import {Settings} from "../../interfaces/settings";
import {CdkDragEnd} from '@angular/cdk/drag-drop';
import {SettingsService} from 'src/app/services/settings/settings.service';
import {ResizeEvent} from 'angular-resizable-element';
import {ResizableModule} from 'angular-resizable-element';

declare function io(): any;

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  socket = io();
  public style: object = {};


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

  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 50;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }

  onResizeEnd(event: ResizeEvent): void {
    this.style = {
      position: 'fixed',
      left: `${event.rectangle.left}px`,
      top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`
    };
  }

  async onResized(event, module){
    console.log('resize was triggered');
    module.position.width = event.rectangle.width;
    module.position.height = event.rectangle.height;
    console.log('***new dimensions: height: '+ module.position.height + ' width: ' + module.position.width);

  }

  onResizedEnd(event: ResizeEvent, module){
    console.log('resize end was triggered');
    module.position.width = event.rectangle.width;
    module.position.height = event.rectangle.height;
    console.log('new dimensions: height: '+ module.position.height + ' width: ' + module.position.width);


  }

}
