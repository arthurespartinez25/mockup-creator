import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CdkDragDrop, CdkDrag, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import { CanvasComponent } from '../canvas/canvas.component';
import {SharedService} from "../shared/shared.service";
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.css'],
})
export class PaletteComponent implements OnInit {
  comp1Val: any = [];
  constructor(private renderer: Renderer2, private shared:SharedService) {
    this.comp1Val = this.shared.comp1Val;
  }
  canvas = CanvasComponent;
  

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

  createButton() {
    //this.container[0] = this.container[1].slice(this.container[1].indexOf('Button1')),this.container[0];
    //this.container.push('Button1');
    this.shared.comp1Val.push('Button1');
  }
  
  createLabel() {
    //this.container[0] = this.container[1].slice(this.container[1].indexOf('Button1')),this.container[0];
    //this.container.push('Button1');
    this.shared.comp1Val.push('Label1');
  }
  createInput() {
    this.shared.comp1Val.push('Text Input');
  }
  ngOnInit(): void {
    //this.message = this.shared.message;
  }
}
