import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ButtonDragComponent } from './components/buttonDrag/buttonDrag.component';
import { TextboxDragComponent } from './components/textboxDrag/textboxDrag.component';
import { PropertyComponent } from './property/property.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { DropdownDragComponent } from './components/dropdownDrag/dropdownDrag.component';
import { CheckboxDragComponent } from './components/checkboxDrag/checkboxDrag.component';
import { RadioDragComponent } from './components/radioDrag/radioDrag.component';
import { DatepickerDragComponent } from './components/datepickerDrag/datepickerDrag.component';
import { LabelDragComponent } from './components/labelDrag/labelDrag.component';
import { ImageDragComponent } from './components/imageDrag/imageDrag.component';
import { NavbarDragComponent } from './components/navbarDrag/navbarDrag.component';
import { ModalDragComponent } from './components/modalDrag/modalDrag.component';
import { InputDragComponent } from './components/inputDrag/inputDrag.component';
import { HeaderDragComponent } from './components/headerDrag/headerDrag.component';
import { LinkDragComponent } from './components/linkDrag/linkDrag.component';
import { ParagraphDragComponent } from './components/paragraphDrag/paragraphDrag.component';
import { PopupDragComponent } from './components/popupDrag/popupDrag.component';
import { TableDragComponent } from './components/tableDrag/tableDrag.component';
import { YoutubeDragComponent } from './components/youtubeDrag/youtubeDrag.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { AppRegisterComponent } from './app-register/app-register.component';
import { DatePipe } from '@angular/common';
import { CanvasComponent } from './section/canvas/canvas.component';
import { PalleteComponent } from './section/pallete/pallete.component'
import { CodeComponent } from './section/code/code.component';
import { TemplatesComponent } from './section/pallete/templates/templates.component';
import { ElementsComponent } from './section/pallete/elements/elements.component';
import { ComponentListComponent } from './section/pallete/component-list/component-list.component';
import { NavigationComponent } from './section/code/navigation/navigation.component';
import { CssComponent } from './section/code/css/css.component';
import { CodeSegmentComponent } from './section/code/code-segment/code-segment.component';
import { DivDragComponent } from './components/divDrag/divDrag.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    PropertyComponent,
    WrapperComponent,
    ButtonDragComponent,
    DropdownDragComponent,
    ImageDragComponent,
    RadioDragComponent,
    TextboxDragComponent,
    LabelDragComponent,
    CheckboxDragComponent,
    PopupDragComponent,
    ParagraphDragComponent,
    NavbarDragComponent,
    ModalDragComponent,
    DatepickerDragComponent,
    HeaderDragComponent,
    InputDragComponent,
    LinkDragComponent,
    TableDragComponent,
    YoutubeDragComponent,
    AppLoginComponent,
    AppRegisterComponent,
    CanvasComponent,
    PalleteComponent,
    CodeComponent,
    TemplatesComponent,
    ElementsComponent,
    ComponentListComponent,
    NavigationComponent,
    CssComponent,
    CodeSegmentComponent,
    DivDragComponent,
    MatConfirmDialogComponent,
  
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, DragDropModule, FormsModule, HttpClientModule, MatDialogModule],
  providers: [DragDropModule, AppComponent, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [MatConfirmDialogComponent],
})
export class AppModule {}