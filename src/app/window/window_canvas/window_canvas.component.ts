import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'window-canvas',
  templateUrl: './window_canvas.component.html',
  styleUrls: ['./window_canvas.component.css']
})
export class WindowCanvasComponent implements OnInit {

  clickEventSubscription:Subscription;
  
  @ViewChild("canvas", {
    read: ElementRef
  })
  public canvas: ElementRef | undefined;
  
  @Input() addedPalette: any[]=[];
  @Input() item:any;

  constructor(private sharedService:SharedService,  private renderer: Renderer2) {
    this.clickEventSubscription = this.sharedService.getClickEvent().subscribe(() => {
      this.addItem();
      //console.log(this.addedPalette);
      
    })
  }
  
  ngOnInit(): void {
  }

  tbox : number = 0;
  lbl : number = 0;
  btn : number = 0;
  
  addItem(){
    let previousItem;
      if(this.item !== previousItem){
        switch(this.item){
          case 1:
            previousItem = this.item;
            this.createInput()
            this.tbox++;
            break;
          case 2:
            previousItem = this.item;
            this.createLabel()
            this.lbl++;
            break;
          case 3:
            previousItem = this.item;
            this.createButton()
            this.btn++;
            break;
          default:
            break;
        }
      }
    }
    
//=================================

  createInput() {
    const newInput = this.renderer.createElement('input');
    this.renderer.addClass(newInput, 'form-control');
    this.renderer.appendChild(document.body, newInput);
    this.renderer.setAttribute(newInput, 'placeholder', 'NEW INPUT');
    return newInput;
  }
  
  createLabel() {
    const newLabel = this.renderer.createElement('p');
    const text = this.renderer.createText('LABEL');
    this.renderer.addClass(newLabel, 'h2');
    this.renderer.appendChild(newLabel, text);
    this.renderer.appendChild(document.body, newLabel);
    this.canvas = newLabel;
    //this.renderer.appendChild(document.body.getElementsByClassName("canvas"), newLabel);
    return newLabel;
  }
  
  createButton() {
    const newButton = this.renderer.createElement('button');
    const text = this.renderer.createText('BUTTON');
    this.renderer.setProperty(newButton, 'type', 'button');
    this.renderer.addClass(newButton, 'btn-primary');
    this.renderer.appendChild(newButton, text);
    this.renderer.appendChild(document.body, newButton);
    return newButton;
  }

}
