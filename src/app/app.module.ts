import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaletteComponent } from './palette/palette.component';
//import { CanvasComponent } from './canvas/canvas.component';
//import { WindowPaletteComponent } from './window_palette/window_palette.component';
import { UIWindowComponent } from './window/window.component';
import { WindowCanvasComponent } from './window/window_canvas/window_canvas.component';
import { WindowPaletteComponent } from './window/window_palette/window_palette.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PaletteComponent,
    UIWindowComponent,
    WindowCanvasComponent,
    WindowPaletteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //CanvasComponent, // import this component for the addedPallete
    FormsModule
    //added FormsModule so the event can be assignable to type 'string' see: https://stackoverflow.com/questions/66407703/error-ts2322-type-event-is-not-assignable-to-type-string-ngmodel-todo
  ],
  exports: [
    WindowCanvasComponent,
    WindowPaletteComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
