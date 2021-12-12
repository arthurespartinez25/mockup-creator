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
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { DatepickerDragComponent } from './components/datepickerDrag/datepickerDrag.component';
import { LabelComponent } from './components/label/label.component';
import { LabelDragComponent } from './components/labelDrag/labelDrag.component';
import { ImageComponent } from './components/image/image.component';
import { ImageDragComponent } from './components/imageDrag/imageDrag.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarDragComponent } from './components/navbarDrag/navbarDrag.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalDragComponent } from './components/modalDrag/modalDrag.component';
import { InputComponent } from './components/input/input.component';
import { InputDragComponent } from './components/inputDrag/inputDrag.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderDragComponent } from './components/headerDrag/headerDrag.component';
import { LinkComponent } from './components/link/link.component';
import { LinkDragComponent } from './components/linkDrag/linkDrag.component';
import { ParagraphComponent } from './components/paragraph/paragraph.component';
import { ParagraphDragComponent } from './components/paragraphDrag/paragraphDrag.component';
import { PopupComponent } from './components/popup/popup.component';
import { PopupDragComponent } from './components/popupDrag/popupDrag.component';

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
    ButtonDragComponent,
    DropdownDragComponent,
    ImageDragComponent,
    RadioDragComponent,
    TextboxDragComponent,
    LabelDragComponent,
    CheckboxDragComponent,
    NavbarComponent,
    ModalComponent,
    InputComponent,
    HeaderComponent,
    LinkComponent,
    ParagraphComponent,
    PopupComponent,
    PopupDragComponent,
    ParagraphDragComponent,
    NavbarDragComponent,
    ModalDragComponent,
    DatepickerDragComponent,
    HeaderDragComponent,
    InputDragComponent,
    LinkDragComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, DragDropModule],
  providers: [DragDropModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
