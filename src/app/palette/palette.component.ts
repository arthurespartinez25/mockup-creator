import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.css'],
})
export class PaletteComponent implements OnInit {
  @ViewChild('canvas')
  canvas!: ElementRef;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {}

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
    this.renderer.appendChild(document.body, newLabel);
    return newLabel;
  }
  createInput() {
    const newInput = this.renderer.createElement('input');
    this.renderer.addClass(newInput, 'form-control');
    this.renderer.appendChild(document.body, newInput);
    this.renderer.setAttribute(newInput, 'placeholder', 'NEW INPUT');
    return newInput;
  }
}
