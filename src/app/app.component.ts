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
}
