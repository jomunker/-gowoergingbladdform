import { Component, OnInit } from '@angular/core';
import { CanvasModuleService } from 'src/app/services/canvasmodule/canvasmodule.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public canvasmoduleservice: CanvasModuleService) { }

  ngOnInit(): void {
  }

}
