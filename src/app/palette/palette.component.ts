import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CdkDragDrop, CdkDrag, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import { CanvasComponent } from '../canvas/canvas.component';

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.css'],
})
export class PaletteComponent implements OnInit {
  constructor(private renderer: Renderer2) {}
  canvas = CanvasComponent;
  ngOnInit(): void {}

  container = ['Button1', 'Text Input', 'Label'];

  
  noReturnPredicate() {
    return false;
  }
  /*drop(event: CdkDragDrop<string[]>)
  {

    if(event.previousContainer === event.container)
    {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else
    {
      const newButton = this.renderer.createElement('button');
      const text = this.renderer.createText('BUTTON');
      this.renderer.setProperty(newButton, 'type', 'button');
      this.renderer.addClass(newButton, 'btn-primary');
      this.renderer.appendChild(newButton, text);
      this.renderer.appendChild(document.body, newButton);
       return newButton;
      
    }
  }*/

  
  
  createLabel() {
    //this.container[0] = this.container[1].slice(this.container[1].indexOf('Button1')),this.container[0];
    this.container.push('Button1');
  }
  createInput() {
    const newInput = this.renderer.createElement('input');
    this.renderer.addClass(newInput, 'form-control');
    this.renderer.appendChild(document.body, newInput);
    this.renderer.setAttribute(newInput, 'placeholder', 'NEW INPUT');
    return newInput;
  }
}
