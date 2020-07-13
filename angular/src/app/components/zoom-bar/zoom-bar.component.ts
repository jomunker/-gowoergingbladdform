import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CanvasComponent} from "../canvas/canvas.component";
import {SettingsService} from "../../services/settings/settings.service";

@Component({
  selector: 'app-zoom-bar',
  templateUrl: './zoom-bar.component.html',
  styleUrls: ['./zoom-bar.component.scss']
})
export class ZoomBarComponent {

  value : number = 1;

  constructor(public dialog: MatDialog, public settingsService: SettingsService) { }

  openDialog(): void {

    this.settingsService.loadSettings().then(settings => {

      const dialogRef = this.dialog.open(DialogHTML, {
        width: '500px',
        data: {width: settings.canvasWidth, height: settings.canvasHeight}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined){
          console.log('The settings-dialog was closed - with results:');
          this.settingsService.triggerSettings(result.width, result.height)
        } else {
          console.log('The settings-dialog was closed - no results');
        }
      });
    });
  }

  //zoomValue is going to get processed in the settings.service.ts
  sliderChange(newValue){
    this.settingsService.setZoomValue(newValue);
  }
}
//provides the dialog.html that's going to get displayed
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'settings-dialog.html',
})
export class DialogHTML {

  constructor(
    public dialogRef: MatDialogRef<DialogHTML>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
