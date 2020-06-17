import { Component, OnInit } from '@angular/core';
import { CanvasModuleService } from 'src/app/services/canvasmodule/canvasmodule.service';

import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  selectedFile: File = null;
  snackBarAction: string = "Nice!";

  constructor(public canvasmoduleservice: CanvasModuleService, private http: HttpClient, private _snackBar: MatSnackBar) { }

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
            let responseMsg = response['message'];
            this.openSnackBar(responseMsg, this.snackBarAction);
        })
  }

  async openSnackBar(message, action) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
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
