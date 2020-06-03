import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import { RootComponent } from './components/root/root.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import {HeaderComponent} from "./components/header/header.component";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {ChatComponent} from "./components/chat/chat.component";


@NgModule({
  declarations: [
    RootComponent,
    CanvasComponent,
    HeaderComponent,
    ToolbarComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
