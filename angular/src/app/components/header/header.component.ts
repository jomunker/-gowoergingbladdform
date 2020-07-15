import {Component, OnInit} from '@angular/core';
import {RootComponent} from '../root/root.component';
import {ChatService} from "../../services/chat/chat.service";
import {CanvasComponent} from "../canvas/canvas.component";
import {SettingsComponent} from '../settings/settings.component';
import {SettingsService} from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public rootComponent: RootComponent, public canvasComponent: CanvasComponent, public chatService: ChatService, public settingsComponent: SettingsComponent, public settingsService: SettingsService) {
  }

  ngOnInit(): void {
  }

}
