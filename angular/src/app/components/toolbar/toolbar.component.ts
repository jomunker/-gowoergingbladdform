import { Component, OnInit } from '@angular/core';
import { CanvasModuleService } from 'src/app/services/canvasmodule/canvasmodule.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  selectedFile: File = null;

  constructor(public canvasmoduleservice: CanvasModuleService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  // File will be uploaded as selectio is done
  onfileChange(element) {
    console.log(event);
    this.selectedFile = element.target.files[0];
    let formData = new FormData();
        formData.append("image", this.selectedFile, this.selectedFile.name);
    
    this.http.post('/upload-image', formData)
        .subscribe((response) => {
            console.log('response received is ', response);
        })
  }

  // File will be uploaded after user clicks on button

  // upload() {
  //   let formData = new FormData();
  //       formData.append("image", this.uploadedFile, this.uploadedFile.name);
  //   this.http.post('/upload-image', formData)
  //       .subscribe((response) => {
  //           console.log('response received is ', response);
  //       })
  // }

}
