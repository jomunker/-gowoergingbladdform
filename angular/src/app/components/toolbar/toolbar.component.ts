import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CanvasModuleService } from 'src/app/services/canvasmodule/canvasmodule.service';
import {CanvasComponent} from "../canvas/canvas.component";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  animal: string;
  name: string;

  constructor(public canvasmoduleservice: CanvasModuleService,public canvasComponent: CanvasComponent , public dialog: MatDialog) { }

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  settings(){
    this.canvasComponent.triggerSettings(5000, 5000);
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
