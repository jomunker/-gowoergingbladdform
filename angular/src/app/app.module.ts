import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AutoFocusDirective } from './directives/auto-focus.directive'
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { RootComponent } from './components/root/root.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChatComponent } from './components/chat/chat.component';
import { HeaderComponent } from './components/header/header.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './components/settings/settings.component';
import { ResizableModule } from 'angular-resizable-element';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { Overlay } from "@angular/cdk/overlay";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import {ZoomBarComponent, DialogHTML} from "./components/zoom-bar/zoom-bar.component";



// import {DragDropModule} from '@angular/cdk/drag-drop';


// @ts-ignore
@NgModule({
  declarations: [
    RootComponent,
    CanvasComponent,
    ChatComponent,
    HeaderComponent,
    ToolbarComponent,
    ZoomBarComponent,
    DialogHTML,
    SettingsComponent,
    AutoFocusDirective
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
    MatCheckboxModule,
    MatCardModule,
    ResizableModule
  ],
  entryComponents: [DialogHTML],
  providers: [CanvasComponent, MatDialog, Overlay, SettingsComponent],
  bootstrap: [RootComponent]
})
export class AppModule { }
