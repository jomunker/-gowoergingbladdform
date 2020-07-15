import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CanvasModuleService} from 'src/app/services/canvasmodule/canvasmodule.service';
import {CanvasComponent} from "../canvas/canvas.component";
import {FileUploadService} from '../../services/file-upload/file-upload.service';
import {SettingsService} from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(public canvasmoduleservice: CanvasModuleService,
              public canvasComponent: CanvasComponent,
              public dialog: MatDialog,
              public fileuploadservice: FileUploadService,
              public settingsService: SettingsService) {}
}

