import {Component, OnInit, HostBinding} from '@angular/core';
import {SettingsService} from 'src/app/services/settings/settings.service';
@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})

export class RootComponent implements OnInit {
  chatOpened = false;
  settingsOpened = false;

  public isDark = false;
  public themeClass: string;

  // public themes: string[] = ['app-dark-theme', 'app-light-theme'];
  public lightTheme = 'app-light-theme';
  public darkTheme = 'app-dark-theme';

  @HostBinding('class')
  get themeMode(){
    return this.themeClass;
  }

  constructor(public settingsService: SettingsService) {
  }

  ngOnInit(){
    this.setThemeMode();
  }

  //if local storage is empty, the theme is set to light mode
  setThemeMode(){
    if(localStorage.getItem('themeMode') === null){
      this.themeClass = this.lightTheme;
      localStorage.setItem('themeMode',this.lightTheme);
    }
    else{
      this.themeClass = localStorage.getItem('themeMode');
    }
  }

  public changeTheme(theme){
    this.themeClass = theme;
    localStorage.setItem('themeMode',theme);
  }

}
