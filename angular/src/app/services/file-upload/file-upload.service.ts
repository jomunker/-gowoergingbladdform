import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService implements OnInit {

  selectedFile: File = null;
  snackBarAction: string = "Nice!";

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // File will be uploaded as selectio is done
  onfileChange(element) {
    console.log(event);
    this.selectedFile = element.target.files[0];
    let formData = new FormData();
        formData.append("image", this.selectedFile, this.selectedFile.name);
    
    this.http.post('/upload-image', formData)
        .subscribe(
          (response) => {
            console.log('response received is ', response);
            let responseMsg = response['message'];
            this.openSnackBar(responseMsg, this.snackBarAction);
          },
          err => console.log(err)
        )
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
