import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})

export class RootComponent implements OnInit {
  chatOpened = false;
  settingsOpened = false;

  constructor() {
  }

  ngOnInit(){

  }

}
