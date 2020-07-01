import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import { RootComponent } from './components/root/root.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChatComponent } from './components/chat/chat.component';
import { HeaderComponent } from './components/header/header.component';
import {DialogHTML, ToolbarComponent} from './components/toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";
import { SettingsComponent } from './components/settings/settings.component';

// import {DragDropModule} from '@angular/cdk/drag-drop';


// @ts-ignore
@NgModule({
  declarations: [
    RootComponent,
    CanvasComponent,
    ChatComponent,
    HeaderComponent,
    ToolbarComponent,
    DialogHTML,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    MatDialogModule,
    // DragDropModule
  ],
  entryComponents: [DialogHTML],
  providers: [CanvasComponent,MatDialog, Overlay,SettingsComponent],
  bootstrap: [RootComponent]
})
export class AppModule { }
