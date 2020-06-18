import { Component, OnInit } from '@angular/core';
import { CanvasModuleService } from 'src/app/services/canvasmodule/canvasmodule.service';

import { FileUploadService } from '../../services/file-upload/file-upload.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public canvasmoduleservice: CanvasModuleService, public fileuploadservice: FileUploadService) { }

  ngOnInit(): void {
  }


}
