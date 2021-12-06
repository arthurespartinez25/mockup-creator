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
  popupCount = 0;

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

  createPopup() {
    const newPopup = this.renderer.createElement('button');
    const text = this.renderer.createText("Popup");
    let ref = this.drag.createDrag(newPopup);
    ref.withBoundaryElement(this.canvas);
    this.renderer.setProperty(newPopup, 'type', 'button');
    this.renderer.addClass(newPopup, 'popup');
    this.renderer.setAttribute(newPopup, 'data-toggle', "popover");
    this.renderer.setAttribute(newPopup, 'data-content', "This is a popup");
    this.renderer.appendChild(newPopup, text);
    this.renderer.appendChild(this.canvas.nativeElement, newPopup);
    //one time insert jquery code to canvas
    /*if(this.popupCount == 0){
      const bootstrapScript = this.renderer.createElement('script');
      this.renderer.setAttribute(bootstrapScript, 'src', "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js");
      const queryScript = this.renderer.createElement('script');
      this.renderer.setAttribute(queryScript, 'src', "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js");
      const functionScript = this.renderer.createElement('script');
      const functionScriptText = this.renderer.createText("$(function () { $(\'[data-toggle=\"popover\"]\').popover()})");
      this.renderer.appendChild(this.canvas.nativeElement, bootstrapScript);
      this.renderer.appendChild(this.canvas.nativeElement, queryScript);
      this.renderer.appendChild(functionScript, functionScriptText);
      this.renderer.appendChild(this.canvas.nativeElement, functionScript);
      this.popupCount++;
    }
    else
      this.popupCount++;
    */
  }
}
