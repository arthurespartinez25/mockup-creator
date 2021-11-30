import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'window-palette',
  templateUrl: './window_palette.component.html',
  styleUrls: ['./window_palette.component.css']
})
export class WindowPaletteComponent implements OnInit {
  strTextbox = 'You added a Text Box.';
  strImage = 'You added an Image.';
  strButton = 'You added a Button.';
  addToCanvas: any[]=[];

  addTextbox(){
    console.log(this.strTextbox);
    this.addToCanvas.push(this.strTextbox);
    this.sharedService.sendClickEvent();
  }

  addImage(){
    console.log(this.strImage);
    this.addToCanvas.push(this.strImage);
    this.sharedService.sendClickEvent();
  }
  
  addButton(){
    console.log(this.strButton);
    this.addToCanvas.push(this.strButton);
    this.sharedService.sendClickEvent();
  }


  constructor(private sharedService:SharedService) { }

  ngOnInit(): void {
  }

}
