import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CdkDragDrop, CdkDrag, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.css'],
})
export class PaletteComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  container = ['A'];

  drop(event: CdkDragDrop<string[]>) {
    if(event.previousContainer.id === event.container.id)
    {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else
    {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
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

  createButton() {
    const newButton = this.renderer.createElement('button');
    const text = this.renderer.createText('BUTTON');
    this.renderer.setProperty(newButton, 'type', 'button');
    this.renderer.addClass(newButton, 'btn-primary');
    this.renderer.appendChild(newButton, text);
    this.renderer.appendChild(document.body, newButton);
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
