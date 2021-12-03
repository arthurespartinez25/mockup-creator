import {
  DragDrop,
  DragDropConfig,
  DragDropModule,
  DragRef,
  DragRefConfig,
} from '@angular/cdk/drag-drop';
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

  @ViewChild('canvas') canvas!: ElementRef;

  constructor(private renderer: Renderer2, private drag: DragDrop) {}

  ngOnInit(): void {
    /* throw new Error('Method not implemented.'); */
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
}
