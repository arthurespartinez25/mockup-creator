import {
  DragDrop,
  DragDropConfig,
  DragDropModule,
  DragRef,
  DragRefConfig,
} from '@angular/cdk/drag-drop';
import { registerLocaleData } from '@angular/common';
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
  radioIdLabel = 1;
  @ViewChild('canvas') canvas!: ElementRef;

  constructor(private renderer: Renderer2, private drag: DragDrop) {}

  ngOnInit(): void {
    /* throw new Error('Method not implemented.'); */
  }

  createRadio(){
    const newRadio = this.renderer.createElement('input');
    let ref =this.drag.createDrag(newRadio);
    ref.withBoundaryElement(this.canvas);
    const text1 = this.renderer.createText('randomtext');
    this.renderer.setProperty(newRadio,'type','radio');
    this.renderer.setProperty(newRadio,'name','flexRadioDefault');    //used to group radio buttons
    this.renderer.setProperty(newRadio,'id','flexRadioDefault'+this.radioIdLabel);
    this.renderer.addClass(newRadio,'form-check-input');
    //console.log('defaultTextforRadio'+this.radioIdLabel);
    //this.renderer.appendChild(newRadio,text1);

    // for the label ****Not joining with Radio*****
    let newLabel = this.renderer.createElement('label');
    let ref1 =this.drag.createDrag(newLabel);
    ref1.withBoundaryElement(this.canvas);
    const text = this.renderer.createText('defaulttext');
    //this.renderer.setProperty(newLabel,'type','label');
    this.renderer.setProperty(newLabel,'for',newRadio.id); //somehow will not display in code to match bootstrap style of radio *Might be the only thing needed to link label and radio*
    this.renderer.addClass(newLabel,'form-check-label');
    this.renderer.appendChild(newLabel, text);

    this.radioIdLabel++;
    this.renderer.appendChild(newRadio,newLabel);
    this.renderer.appendChild(this.canvas.nativeElement,newRadio);
    this.renderer.appendChild(this.canvas.nativeElement,newLabel);
  }

  createDate(){     //should this need label, then same problem with createRadio
    const newDate = this.renderer.createElement('input');
    let ref = this.drag.createDrag(newDate);
    this.renderer.setProperty(newDate,'type','date');
    this.renderer.setProperty(newDate,'id','defaultDate');
    this.renderer.setProperty(newDate,'name','date');
    
    this.renderer.appendChild(this.canvas.nativeElement,newDate);
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
}
