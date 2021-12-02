import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'window-palette',
  templateUrl: './window_palette.component.html',
  styleUrls: ['./window_palette.component.css'],
})

export class WindowPaletteComponent implements OnInit {
  @ViewChild("canvas", {
    read: ElementRef
  })
  public canvas!: ElementRef;

  post = '';
  strTextbox = 'You added a TextBox.';
  strLabel = '<label>Label</label>';
  strButton = 'You added a Button.';
  addToCanvas: any[]=[];
  data: number | undefined;

  constructor(private sharedService:SharedService, private renderer: Renderer2) { }
  
  ngOnInit(): void {
  }
  
  addTextbox(){
    console.log(this.strTextbox);
    //this.addToCanvas.push(this.strTextbox);
    this.data = 1;
    this.sharedService.sendClickEvent();
    this.addToCanvas.push(this.createInput() + " " + this.createInput().toString);
  }

  addLabel(){
    console.log(this.strLabel);
    //this.addToCanvas.push(this.strLabel);
    this.data = 2;
    this.sharedService.sendClickEvent();
    this.addToCanvas.push(this.createLabel() + " " + this.createLabel().toString);
  }
  
  addButton(){
    console.log(this.strButton);
    //this.addToCanvas.push(this.strButton);
    this.data = 3;
    this.sharedService.sendClickEvent();
    this.addToCanvas.push(this.createButton() + " " + this.createButton().toString);
  }

  createInput() {
    const newInput = this.renderer.createElement('input');
    this.renderer.addClass(newInput, 'form-control');
    this.renderer.appendChild(document.body, newInput);
    this.renderer.setAttribute(newInput, 'placeholder', 'NEW INPUT');
    return newInput.innerHTML;
  }
  
  createLabel() {
    const newLabel = this.renderer.createElement('p');
    const text = this.renderer.createText('LABEL');
    this.renderer.addClass(newLabel, 'h2');
    this.renderer.appendChild(newLabel, text);
    this.renderer.appendChild(document.body, newLabel);
    //this.canvas = newLabel.querySelector('.canvas');
    //this.renderer.appendChild(document.getElementsByClassName('canvas'), newLabel);
    return newLabel.innerHTML;
  }
  
  createButton() {
    const newButton = this.renderer.createElement('button');
    const text = this.renderer.createText('BUTTON');
    this.renderer.setProperty(newButton, 'type', 'button');
    this.renderer.addClass(newButton, 'btn-primary');
    this.renderer.appendChild(newButton, text);
    this.renderer.appendChild(document.body, newButton);
    return newButton.innerHTML;
  }
}
