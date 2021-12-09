import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ButtonComponent } from './components/button/button.component';
import { ButtonDragComponent } from './components/buttonDrag/buttonDrag.component';
import { TextboxComponent } from './components/textbox/textbox.component';
import { TextboxDragComponent } from './components/textboxDrag/textboxDrag.component';
import { PropertyComponent } from './property/property.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DropdownDragComponent } from './components/dropdownDrag/dropdownDrag.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { CheckboxDragComponent } from './components/checkboxDrag/checkboxDrag.component';
import { RadioComponent } from './components/radio/radio.component';
import { RadioDragComponent } from './components/radioDrag/radioDrag.component';
import { LabelComponent } from './components/label/label.component';
import { LabelDragComponent } from './components/labelDrag/labelDrag.component';
import { ImageComponent } from './components/image/image.component';
import { ImageDragComponent } from './components/imageDrag/imageDrag.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    PropertyComponent,
    WrapperComponent,
    DropdownComponent,
    CheckboxComponent,
    RadioComponent,
    TextboxComponent,
    LabelComponent,
    ImageComponent,
    ButtonDragComponent,
    DropdownDragComponent,
    ImageDragComponent,
    RadioDragComponent,
    TextboxDragComponent,
    LabelDragComponent,
    CheckboxDragComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, DragDropModule],
  providers: [DragDropModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
