import { Component, OnInit } from '@angular/core';
import { CanvasModule } from 'src/app/interfaces/canvasModule';
import { CanvasModuleService } from 'src/app/services/canvasmodule/canvasmodule.service';
import { ArrayChecksService } from '../../services/array-checks/array-checks.service';

declare function io(): any;


@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  socket = io();

  // canvasmodule: CanvasModule = {
  //   _id: "1",
  //   idHTML: 4,
  //   type: "doc",
  //   position: { x: 0, y: 0, width: 0, height: 0 },
  //   content: "4",
  // }

  // moduleArray = [this.canvasmodule];


  constructor(public canvasmoduleservice: CanvasModuleService) { }

  ngOnInit() {

    this.socket.on('edited', (moduleEdit) => {
      this.canvasmoduleservice.moduleArrayEdit(moduleEdit);
      console.log("Module edited.");
    });

    this.socket.on('deleteModule', (object) => {
      this.canvasmoduleservice.moduleArrayDelete(object);
      console.log("Module deleted.");
    });
  }

  editDoc(object) {
    
    this.canvasmoduleservice.moduleEdit(object);
  }

  

}
