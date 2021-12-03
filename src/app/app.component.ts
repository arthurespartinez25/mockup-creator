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
}
