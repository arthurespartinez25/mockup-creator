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
  theDiv: string;

  @ViewChild('canvas') canvas!: ElementRef;

  constructor(private renderer: Renderer2, private drag: DragDrop) {}

  ngOnInit(): void {
    /* throw new Error('Method not implemented.'); */
    this.theDiv = `<h2>test</h2>`;
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
}
