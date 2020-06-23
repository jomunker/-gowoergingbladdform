import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CanvasModuleService } from 'src/app/services/canvasmodule/canvasmodule.service';
import {CanvasComponent} from "../canvas/canvas.component";
import {Settings} from "../../interfaces/settings";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(public canvasmoduleservice: CanvasModuleService,public canvasComponent: CanvasComponent , public dialog: MatDialog) { }


  openDialog(): void {

    this.canvasComponent.loadSettings().then(settings => {

      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '500px',
        data: {width: settings.canvasWidth, height: settings.canvasHeight}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined){
          console.log('The dialog was closed - results:');
          console.log(result)
          this.canvasComponent.triggerSettings(result.width, result.height)
        } else {
          console.log('The dialog was closed - no results');
        }
      });
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'settings-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
