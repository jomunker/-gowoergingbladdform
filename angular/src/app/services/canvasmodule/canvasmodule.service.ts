import {Injectable} from '@angular/core';
import {CanvasModule} from '../../interfaces/canvasModule';
import {HttpClient} from '@angular/common/http';

declare function io(): any;


@Injectable({
  providedIn: 'root'
})
export class CanvasModuleService {
  socket = io();
  lastTextEmit = 0;

  moduleArray: Array<CanvasModule> = [];

  constructor(private http: HttpClient) {
    this.loadModules();
  }

  ngOnInit() {
    this.socket.on('new doc', (module) => {
      this.moduleArray.push(module);
    });
  }

  //called every 1 ms in canvas.component.ts
  updateLastTextEmit(): void {
    if (this.lastTextEmit <= 500) {
      this.lastTextEmit += 1;
    }
  }

  // creates new module
  moduleCreate(content: any, type: string): void {
    //console.log(screen.availWidth);
    const halfWidth = screen.availWidth / 2.5;
    const halfHeight = screen.availHeight / 3;
    //console.log(halfWidth)
    const module: CanvasModule = {
      _id: undefined, // defined from database
      type: type,
      position: {
        x: halfWidth,
        y: halfHeight,
        width: 200,
        height: 200
      },
      content: content,
    };
    //console.log(module);
    this.socket.emit('new module', (module));
  }

  moduleArrayPush(module) {
    this.moduleArray.push(module);
  }

  // emits 'module edited' to initiate the edit of a module
  moduleEdit(object) {
    this.moduleArrayEdit(object);

    //to place the checked to-dos at the bottom after they get checked.
    if (Array.isArray(object.content)) {
      object.content = object.content.sort(function (a, b) {
        return a.checked - b.checked;
      })
    }
    //when type doc, emit only after 500ms passed. to slow the connections down.
    if (object.type === "doc") {
      if (this.lastTextEmit >= 500) {
        this.socket.emit('module edited', (object));
        this.lastTextEmit = 0;
      }
    }
    if (object.type != "doc") {
      this.socket.emit('module edited', (object));
    }
  }

  // replaces the module in moduleArray if module is edited
  moduleArrayEdit(object) {
    for (let i = 0; i < this.moduleArray.length; i++) {

      const module = this.moduleArray[i];

      if (module._id == object._id) {

        // checks if the content has changed
        if (module.content != object.content) {

          // checks if the content is an Array
          if (Array.isArray(object.content)) {

            // checks if checked value has changed on to-do modules
            for (let j = 0; j < object.content.length; j++) {
              if (object.content[j].checked != module.content[j].checked) {
                module.content.splice(j, 1, object.content[j]);
              }
            }
            module.content.sort(function (a, b) {
              return a.checked - b.checked;
            })
          } else {
            this.moduleArray.splice(i, 1, object);
          }
        }

        // checks if the x or y position has changed
        if (module.position.x != object.position.x || module.position.y != object.position.y) {
          this.moduleArray.splice(i, 1, object);
        }

        // checks if width or height has changed
        if (module.position.width != object.position.width || module.position.height != object.position.height) {
          this.moduleArray.splice(i, 1, object);
        }
      }
    }
  }

  // emits 'module deleted' to initiate the delete of a module
  moduleDelete(deleteObject) {
    this.socket.emit('module deleted', (deleteObject));
  }

  // splices module in moduleArray if module is deleted
  moduleArrayDelete(object) {
    for (let i = 0; i < this.moduleArray.length; i++) {
      const module = this.moduleArray[i];

      if (module._id == object._id) {
        console.log(this.moduleArray[i]);
        this.moduleArray.splice(i, 1);
      }
    }
  }

  //loads module DB
  loadModules() {

    const option = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }

    this.http.post('/api/modules', option).subscribe(response => {
      // type change object(which is an array actually) -> any
      let data: any = response;
      let newDisplayedArray: Array<CanvasModule> = [];

      // go to the whole array and split each item into these two new Arrays
      for (let i = 0; i < data.length; i++) {
        newDisplayedArray.push(data[i]);
      }
      this.moduleArray = newDisplayedArray;
      console.log(this.moduleArray);
    });
    console.log("DB loaded");
  }
}
