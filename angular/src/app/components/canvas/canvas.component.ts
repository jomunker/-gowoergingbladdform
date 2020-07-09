import {Component, OnInit} from '@angular/core';
import {CanvasModuleService} from 'src/app/services/canvasmodule/canvasmodule.service';
import {CdkDragEnd} from '@angular/cdk/drag-drop';
import {SettingsService} from 'src/app/services/settings/settings.service';
import {ResizeEvent} from 'angular-resizable-element';
import {TodoService} from 'src/app/services/todo/todo.service';

declare function io(): any;

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  socket = io();
  moduleMaxSize = 500;
  moduleMinSize = 200;

  constructor(public canvasmoduleservice: CanvasModuleService, public settingsService: SettingsService, public todoservice: TodoService) {
  }


  ngOnInit() {

    this.canvasmoduleservice.loadModules();
    this.settingsService.load();

    setInterval(() => {
      this.canvasmoduleservice.updateLastTextEmit()}, 1);

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
    if (module.position.x < 0) {
      module.position.x = 0;
    } else if (module.position.y < 0) {
      module.position.y = 0;
    } else if ((module.position.x + module.position.width) > this.settingsService.settings.canvasWidth) {
      module.position.x = this.settingsService.settings.canvasWidth - module.position.width;
    } else if ((module.position.y + module.position.height) > this.settingsService.settings.canvasHeight) {
      module.position.y = this.settingsService.settings.canvasHeight - module.position.height;
    }
    this.canvasmoduleservice.moduleEdit(module);
  }

  validate(event: ResizeEvent): boolean {
    // const MIN_DIMENSIONS_PX: number = 100;
    return !(event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < this.moduleMinSize ||
        event.rectangle.height < this.moduleMinSize));
  }

  // updates module width and height at resizing
  onResizeEnd(event: ResizeEvent, module) {
    console.log('resize end was triggered');
    module.position.width = this.checkRectangle(event.rectangle.width);
    module.position.height = this.checkRectangle(event.rectangle.height);
    this.canvasmoduleservice.moduleEdit(module);
    console.log('width ' + event.rectangle.width);
    console.log('height ' + event.rectangle.height);

    console.log('new dimensions: height: ' + module.position.height + ' width: ' + module.position.width);
  }

  checkRectangle(size) {
    if (size > this.moduleMaxSize) {
      size = this.moduleMaxSize;
    }
    if (size < this.moduleMinSize) {
      size = this.moduleMinSize;
    }
    return size;
  }

  trackByFn(index: any) {
    return index;
  }
}
