import {Component, OnInit} from '@angular/core';
import { CanvasModuleService } from 'src/app/services/canvasmodule/canvasmodule.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})

export class RootComponent implements OnInit {
  opened = false;

  constructor(public canvasmoduleservice: CanvasModuleService) {
  }

  ngOnInit(){

  }

}
