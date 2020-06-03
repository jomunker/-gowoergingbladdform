import { Component, OnInit } from '@angular/core';
import { CanvasModule } from 'src/app/interfaces/canvasModule';
import { CanvasModuleService } from 'src/app/services/canvasmodule/canvasmodule.service';

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

    this.socket.on('module edited', (moduleEdit) => {
      // search and replace the edited object in the modules array

      // @ts-ignore
      const replaceObject : EntryObject = ArrayChecksService.checkIfEntriesExists(this.moduleArray, moduleEdit)

      if (replaceObject.exists) {
        this.canvasmoduleservice.moduleArray.splice(replaceObject.position, 1, moduleEdit)
      } else {
        console.log(JSON.stringify(moduleEdit) + "can not be edited")
      }
      

    });
  }

  editDoc(module) {
    this.canvasmoduleservice.moduleEdit(module);
  }

  

}
