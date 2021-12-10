import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ButtonComponent } from './components/button/button.component';
import { TextboxComponent } from './components/textbox/textbox.component';
import { PropertyComponent } from './property/property.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { RadioComponent } from './components/radio/radio.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { LabelComponent } from './components/label/label.component';
import { ImageComponent } from './components/image/image.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalComponent } from './components/modal/modal.component';
import { InputComponent } from './components/input/input.component';
import { HeaderComponent } from './components/header/header.component';
import { LinkComponent } from './components/link/link.component';
import { ParagraphComponent } from './components/paragraph/paragraph.component';
import { PopupComponent } from './components/popup/popup.component';

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
    DatepickerComponent,
    LabelComponent,
    ImageComponent,
    NavbarComponent,
    ModalComponent,
    InputComponent,
    HeaderComponent,
    LinkComponent,
    ParagraphComponent,
    PopupComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [DragDropModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
