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

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  createButton() {
    const newButton = this.renderer.createElement('button');
    const text = this.renderer.createText('BUTTON');
    this.renderer.setProperty(newButton, 'type', 'button');
    this.renderer.addClass(newButton, 'btn-primary');
    this.renderer.appendChild(newButton, text);
    this.renderer.appendChild(this.canvas.nativeElement, newButton);
    return newButton;
  }
  createLabel() {
    const newLabel = this.renderer.createElement('p');
    const text = this.renderer.createText('LABEL');
    this.renderer.addClass(newLabel, 'h2');
    this.renderer.appendChild(newLabel, text);
    this.renderer.appendChild(this.canvas.nativeElement, newLabel);
    return newLabel;
  }
  createInput() {
    const newInput = this.renderer.createElement('input');
    this.renderer.addClass(newInput, 'form-control');
    this.renderer.appendChild(this.canvas.nativeElement, newInput);
    this.renderer.setAttribute(newInput, 'placeholder', 'NEW INPUT');
    return newInput;
  }
}
