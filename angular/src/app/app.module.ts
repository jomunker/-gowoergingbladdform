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
import { DialogHTML, ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { Overlay } from "@angular/cdk/overlay";
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatCardModule } from '@angular/material/card';



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
    MatCardModule
    // DragDropModule
  ],
  entryComponents: [DialogHTML],
  providers: [CanvasComponent, MatDialog, Overlay],
  bootstrap: [RootComponent]
})
export class AppModule { }
