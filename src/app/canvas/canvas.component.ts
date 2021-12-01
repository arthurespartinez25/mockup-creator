import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CdkDragDrop, CdkDrag, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
  }

  container = ['A'];
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
  drop(event: CdkDragDrop<string[]>) {
    if(event.previousContainer.id === event.container.id)
    {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else
    {
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
