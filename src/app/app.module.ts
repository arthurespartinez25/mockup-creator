import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaletteComponent } from './palette/palette.component';
//import { CanvasComponent } from './canvas/canvas.component';
//import { WindowPaletteComponent } from './window_palette/window_palette.component';
import { UIWindowComponent } from './window/window.component';
import { CanvasComponent } from './window/canvas/canvas.component';
import { WindowPaletteComponent } from './window/window_palette/window_palette.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PaletteComponent,
    UIWindowComponent,
    CanvasComponent,
    WindowPaletteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
