import { Component, OnInit } from '@angular/core';
import {RootComponent} from '../root/root.component';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public rootComponent: RootComponent) { }

  ngOnInit(): void {
  }

}
