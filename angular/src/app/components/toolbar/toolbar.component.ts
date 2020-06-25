import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CanvasModuleService} from 'src/app/services/canvasmodule/canvasmodule.service';
import {CanvasComponent} from "../canvas/canvas.component";
import {FileUploadService} from '../../services/file-upload/file-upload.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(public canvasmoduleservice: CanvasModuleService,public canvasComponent: CanvasComponent, public dialog: MatDialog, public fileuploadservice: FileUploadService) { }


  openDialog(): void {

    this.canvasComponent.loadSettings().then(settings => {

      const dialogRef = this.dialog.open(DialogHTML, {
        width: '500px',
        data: {width: settings.canvasWidth, height: settings.canvasHeight}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined){
          console.log('The settings-dialog was closed - with results:');
          this.canvasComponent.triggerSettings(result.width, result.height)
        } else {
          console.log('The settings-dialog was closed - no results');
        }
      });
    });
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
