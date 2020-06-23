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
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: {width: this.canvasComponent.settings.canvasWidth, height: this.canvasComponent.settings.canvasHeight}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed - results:');
      console.log(result)
      this.canvasComponent.triggerSettings(result.width, result.height)
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
