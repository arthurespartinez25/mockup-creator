import {
  DragDrop,
  DragDropConfig,
  DragDropModule,
  DragRef,
  DragRefConfig,
} from '@angular/cdk/drag-drop';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'mockup-creator';
  theDiv: string;

  @ViewChild('canvas') canvas!: ElementRef;

  constructor(private renderer: Renderer2, private drag: DragDrop) {}

  ngOnInit(): void {
    /* throw new Error('Method not implemented.'); */
    this.theDiv = `<h2>test</h2>`;
  }

  createNav() {
    const newNav = this.renderer.createElement('div'); //create dom element
    let ref = this.drag.createDrag(newNav); //make the element draggable with createDrag, then store the reference to ref
    ref.withBoundaryElement(this.canvas); //set the draggable area to only be the canvas

    const newLabel = this.renderer.createElement('h1');
    const text = this.renderer.createText('NAV');

    const link1 = this.renderer.createElement('a');
    const link2 = this.renderer.createElement('a');
    const link3 = this.renderer.createElement('a');

    this.renderer.appendChild(link1, this.renderer.createText('LINK1'));
    this.renderer.appendChild(link2, this.renderer.createText('LINK2'));
    this.renderer.appendChild(link3, this.renderer.createText('LINK3'));

    this.renderer.setProperty(link1, 'href', '#');
    this.renderer.setProperty(link2, 'href', '#');
    this.renderer.setProperty(link3, 'href', '#');

    this.renderer.appendChild(newLabel, text);
    this.renderer.appendChild(newNav, newLabel);
    this.renderer.appendChild(newNav, link1);
    this.renderer.appendChild(newNav, link2);
    this.renderer.appendChild(newNav, link3);

    this.renderer.addClass(link1, 'custom-nav-link');
    this.renderer.addClass(link2, 'custom-nav-link');
    this.renderer.addClass(link3, 'custom-nav-link');

    this.renderer.addClass(newNav, 'navbar'); //add css class to the button
    this.renderer.addClass(newNav, 'custom-nav'); //add css class to the button

    this.renderer.appendChild(this.canvas.nativeElement, newNav); //append the button to the canvas div
  }

  createButton() {
    const newButton = this.renderer.createElement('button'); //create dom element

    let ref = this.drag.createDrag(newButton); //make the element draggable with createDrag, then store the reference to ref

    ref.withBoundaryElement(this.canvas); //set the draggable area to only be the canvas

    const text = this.renderer.createText('BUTTON'); //add text to button

    this.renderer.setProperty(newButton, 'type', 'button'); //add type attribute to button

    this.renderer.addClass(newButton, 'btn-primary'); //add css class to the button

    this.renderer.appendChild(newButton, text); //append the text into the button tag

    this.renderer.appendChild(this.canvas.nativeElement, newButton); //append the button to the canvas div
  }

  createDropdown() {
    const newDiv = this.renderer.createElement('div');
    const drpButton = this.renderer.createElement('button');
    const menuDiv = this.renderer.createElement('div');
    const menu1 = this.renderer.createElement('a');
    const menu2 = this.renderer.createElement('a');
    const menu3 = this.renderer.createElement('a');
    /* const firstDiv = this.renderer.insertBefore(newDiv, drpButton, this.canvas.nativeElement.firstChild); 
    const secondDiv = this.renderer.insertBefore(newDiv, menuDiv, this.canvas.nativeElement.firstChild); */
    this.renderer.appendChild(newDiv, drpButton);
    this.renderer.appendChild(newDiv, menuDiv);
    this.renderer.appendChild(menuDiv, menu1);
    this.renderer.appendChild(menuDiv, menu2);
    this.renderer.appendChild(menuDiv, menu3);

    let ref = this.drag.createDrag(drpButton);
    ref.withBoundaryElement(this.canvas);

    const text = this.renderer.createText('Dropdown');
    const menu1Text = this.renderer.createText('Menu1');
    const menu2Text = this.renderer.createText('Menu2');
    const menu3Text = this.renderer.createText('Menu3');

    this.renderer.setProperty(drpButton, 'type', 'button');
    this.renderer.setProperty(drpButton, 'id', 'dropdownMenuButton');
    this.renderer.setProperty(menu1, 'href', '#');
    this.renderer.setProperty(menu2, 'href', '#');
    this.renderer.setProperty(menu3, 'href', '#');

    this.renderer.addClass(newDiv, 'dropdown');
    this.renderer.addClass(drpButton, 'btn');
    this.renderer.addClass(drpButton, 'btn-secondary');
    this.renderer.addClass(drpButton, 'dropdown-toggle');
    this.renderer.addClass(menuDiv, 'dropdown-menu');
    this.renderer.addClass(menu1, 'dropdown-item');
    this.renderer.addClass(menu2, 'dropdown-item');
    this.renderer.addClass(menu3, 'dropdown-item');

    this.renderer.setAttribute(drpButton, 'data-toggle', 'dropdown');
    this.renderer.setAttribute(drpButton, 'aria-haspopup', 'true');
    this.renderer.setAttribute(drpButton, 'aria-expanded', 'false');
    this.renderer.setAttribute(
      menuDiv,
      'aria-labelledby',
      'dropdownMenuButton'
    );

    this.renderer.appendChild(drpButton, text);
    this.renderer.appendChild(menu1, menu1Text);
    this.renderer.appendChild(menu2, menu2Text);
    this.renderer.appendChild(menu3, menu3Text);
    this.renderer.appendChild(this.canvas.nativeElement, newDiv);
  }

  createModal() {
    const modalContainer = this.renderer.createElement('div'); //create dom element
    const modalDialog = this.renderer.createElement('div'); //create dom element
    const modalContent = this.renderer.createElement('div'); //create dom element
    const modalHeader = this.renderer.createElement('div'); //create dom element
    const modalHeaderButton = this.renderer.createElement('button'); //create dom element
    const modalTitle = this.renderer.createElement('h5'); //create dom element
    const modalTitleText = this.renderer.createText('MODAL'); //add text for Header
    const modalBody = this.renderer.createElement('div'); //create dom element
    const modalPar = this.renderer.createElement('p'); //create dom element
    const modalText = this.renderer.createText('Hi, I am your Modal'); //Text within the Modal
    const modalFooter = this.renderer.createElement('div'); //create dom element
    const modalButtonClose = this.renderer.createElement('button'); //create dom element
    const modalButtonCloseText = this.renderer.createText('Close'); //add text to button
    const modalButtonSave = this.renderer.createElement('button'); //create dom element
    const modalButtonSaveText = this.renderer.createText('Save Changes'); //add text to button

    let ref = this.drag.createDrag(modalContainer); //make the element draggable with createDrag, then store the reference to ref

    ref.withBoundaryElement(this.canvas); //set the draggable area to only be the canvas

    /***********************************/
    //properties commented below maybe used for future reference

    //this.renderer.setProperty(modalContainer, 'id', 'exampleModal'); //add id attribute to modalContainer
    //this.renderer.setProperty(modalContainer, 'tabindex', '-1'); //add tabindex attribute to modalContainer
    //this.renderer.setProperty(modalContainer, 'aria-labelledby', 'exampleModalLabel'); //add type attribute to div
    //this.renderer.setProperty(modalContainer, 'aria-hidden', 'true'); //add type attribute to div
    //this.renderer.setProperty(modalHeaderButton, 'data-bs-dismiss', 'modal'); //add data-bs-dismiss attribute to modalHeaderButton
    //this.renderer.setProperty(modalHeaderButton, 'aria-label', 'Close'); //add aria-label attribute to modalHeaderButton
    this.renderer.setProperty(modalHeaderButton, 'type', 'button'); //add type attribute to button
    //this.renderer.setProperty(modalButtonClose, 'data-bs-dismiss', 'modal'); //add aria-label attribute to modalButtonClose
    this.renderer.setProperty(modalButtonClose, 'type', 'button'); //add type attribute to modalButtonClose
    this.renderer.setProperty(modalButtonSave, 'type', 'button'); //add type attribute to modalButtonSave

    //this.renderer.addClass(modalContainer, 'modal'); //add css class to the button
    //this.renderer.addClass(modalContainer, 'fade'); //add css class to the button
    this.renderer.addClass(modalContainer, 'always-on-top'); //add css class to the modalContainer
    this.renderer.addClass(modalDialog, 'modal-dialog'); //add css class to the modalDialog
    this.renderer.addClass(modalContent, 'modal-content'); //add css class to the modalContent
    this.renderer.addClass(modalHeader, 'modal-header'); //add css class to the modalHeader
    this.renderer.addClass(modalTitle, 'modal-title'); //add css class to the modalTitle
    this.renderer.addClass(modalHeaderButton, 'btn-close'); //add css class to the modalHeaderButton
    this.renderer.addClass(modalBody, 'modal-body'); //add css class to the modalBody
    this.renderer.addClass(modalFooter, 'modal-footer'); //add css class to the modalFooter
    this.renderer.addClass(modalButtonClose, 'btn'); //add css class to the modalButtonClose
    this.renderer.addClass(modalButtonClose, 'btn-secondary'); //add css class to the modalButtonClose
    this.renderer.addClass(modalButtonSave, 'btn'); //add css class to the modalButtonSave
    this.renderer.addClass(modalButtonSave, 'btn-primary'); //add css class to the modalButtonSave

    this.renderer.appendChild(modalContainer, modalDialog); //append modalDialog to modalContainer
    this.renderer.appendChild(modalDialog, modalContent); //append modalContent to modalDialog
    this.renderer.appendChild(modalContent, modalHeader); //append modalHeader to modalContent
    this.renderer.appendChild(modalHeader, modalTitle); //append modalTitle to modalHeader
    this.renderer.appendChild(modalTitle, modalTitleText); //append modalTitleText to modalTitle
    this.renderer.appendChild(modalHeader, modalHeaderButton); //append modalCloseButton to modalHeader
    this.renderer.appendChild(modalContent, modalBody); //append modalHeader to modalContent
    this.renderer.appendChild(modalBody, modalPar); //append modalPar to modalBody
    this.renderer.appendChild(modalPar, modalText); //append modalText to modalPar
    this.renderer.appendChild(modalContent, modalFooter); //append modalHeader to modalContent
    this.renderer.appendChild(modalButtonSave, modalButtonSaveText); //append modalButton2Text to modalButton2
    this.renderer.appendChild(modalButtonClose, modalButtonCloseText); //append modalButton1Text to modalButton1
    this.renderer.appendChild(modalFooter, modalButtonClose); //append modalButton1 to modalFooter
    this.renderer.appendChild(modalFooter, modalButtonSave); //append modalButton2 to modalFooter

    this.renderer.appendChild(this.canvas.nativeElement, modalContainer); //append the modalContainer to the canvas div

    /******************reference for modal trigger function***********************/
    // code below can be used as reference
    /*
    const modalButton = this.renderer.createElement('button'); //create dom element
    let ref = this.drag.createDrag(modalButton); //make the element draggable with createDrag, then store the reference to ref
    ref.withBoundaryElement(this.canvas); //set the draggable area to only be the canvas
    const text = this.renderer.createText('MODAL'); //add text to MODAL
    this.renderer.setProperty(modalButton, 'type', 'button'); //add type attribute to button
    this.renderer.setProperty(modalButton, 'data-bs-toggle', 'modal'); //add data-bs-toggle attribute to button
    this.renderer.setProperty(modalButton, 'data-bs-target', '#exampleModal'); //add data-bs-target attribute to button
    this.renderer.addClass(modalButton, 'btn'); //add css class to the MODAL
    this.renderer.addClass(modalButton, 'btn-primary'); //add css class to the MODAL
    this.renderer.appendChild(modalButton, text); //append the text into the LABEL
    this.renderer.appendChild(this.canvas.nativeElement, modalButton); //append the button to the canvas div\
    */

    /*
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>

    <div class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    */
  }

  createCheckbox() {
    const mainDiv = this.renderer.createElement('div');
    const newCheckbox = this.renderer.createElement('input');
    const checkboxLabel = this.renderer.createElement('label');

    this.renderer.appendChild(mainDiv, checkboxLabel);
    this.renderer.appendChild(checkboxLabel, newCheckbox);

    let ref = this.drag.createDrag(checkboxLabel);
    ref.withBoundaryElement(this.canvas);

    this.renderer.addClass(mainDiv, 'form-check');
    this.renderer.addClass(newCheckbox, 'form-check-input');
    this.renderer.addClass(checkboxLabel, 'form-check-label');

    this.renderer.setProperty(newCheckbox, 'type', 'checkbox');
    this.renderer.setProperty(newCheckbox, 'id', 'flexCheckDefault');
    this.renderer.setProperty(newCheckbox, 'value', 'checkbox');

    const text = this.renderer.createText('Label');
    this.renderer.setAttribute(checkboxLabel, 'for', 'flexCheckDefault');
    this.renderer.appendChild(checkboxLabel, text);

    this.renderer.appendChild(this.canvas.nativeElement, mainDiv);
  }

  createLabel() {
    const checkboxLabel = this.renderer.createElement('label');

    let ref3 = this.drag.createDrag(checkboxLabel);
    ref3.withBoundaryElement(this.canvas);

    const text = this.renderer.createText('Label');
    this.renderer.addClass(checkboxLabel, 'form-check-label');

    this.renderer.appendChild(checkboxLabel, text);
    this.renderer.appendChild(this.canvas.nativeElement, checkboxLabel);
  }
  createInputField() {
    const container = this.renderer.createElement('div');
    const inputField = this.renderer.createElement('input');

    let ref3 = this.drag.createDrag(inputField);
    ref3.withBoundaryElement(this.canvas);

    /*const text = this.renderer.createText('Enter text here');*/

    //this.renderer.addClass(inputField, 'form-control');
    //this.renderer.addClass(container, 'form-group');
    this.renderer.addClass(container, 'inputFieldContainer');
    this.renderer.addClass(inputField, 'inputField');
    this.renderer.setProperty(inputField, 'type', 'text');
    this.renderer.setProperty(inputField, 'placeholder', 'INPUT');
    //this.renderer.appendChild(inputField, text);
    this.renderer.appendChild(container, inputField);
    this.renderer.appendChild(this.canvas.nativeElement, inputField);
  }
  createParagraph() {
    const container = this.renderer.createElement('div');
    const paragraph = this.renderer.createElement('p');

    let ref3 = this.drag.createDrag(container);
    ref3.withBoundaryElement(this.canvas);


    const text = this.renderer.createText('Enter text here');

    //this.renderer.addClass(paragraph, 'form-control');
    //this.renderer.addClass(container, 'form-group');
    //this.renderer.addClass(container, 'paragraphContainer');
    this.renderer.addClass(paragraph, 'paragraph');
    //this.renderer.appendChild(inputField, text);
    this.renderer.appendChild(paragraph, text);
    this.renderer.appendChild(container, paragraph);
    this.renderer.appendChild(this.canvas.nativeElement, container);
  }
  createLink() {
    const Link = this.renderer.createElement('a');

    let ref3 = this.drag.createDrag(Link);
    ref3.withBoundaryElement(this.canvas);

    this.renderer.setProperty(Link, 'href', 'https:/shabu.com');

    const text = this.renderer.createText('This is a link');
    this.renderer.addClass(Link, 'Link');

    this.renderer.appendChild(Link, text);
    this.renderer.appendChild(this.canvas.nativeElement, Link);
  }


}
