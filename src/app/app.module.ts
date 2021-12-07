import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ButtonComponent } from './components/button/button.component';
import { PropertyComponent } from './property/property.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { RadioComponent } from './components/radio/radio.component';

@NgModule({
  declarations: [AppComponent, ButtonComponent, PropertyComponent, WrapperComponent, RadioComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [DragDropModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
