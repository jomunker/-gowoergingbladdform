import {Component, OnInit, HostBinding} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})

export class RootComponent implements OnInit {
  chatOpened = false;
  settingsOpened = false;
  private isDark = true;

  @HostBinding('class')
  get themeMode(){
    return this.isDark ? 'app-dark-theme' : 'app-light-theme';
  }

  constructor() {
  }

  ngOnInit(){

  }

}
