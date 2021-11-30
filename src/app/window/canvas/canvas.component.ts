import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'window-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  @Input() addedPallete: any[]=[];

  clickEventSubscription:Subscription;

  constructor(private sharedService:SharedService) {
    this.clickEventSubscription = this.sharedService.getClickEvent().subscribe(() => {
      /*
      switch(this.addedPallete.toString()){
        case "You added a Text Box.":
          this.incrementTextbox();
          break;
        case "You added an Image.":
          this.incrementImage();
          break;
        case "You added a Button.":
          this.incrementButton();
          break;
        default:
          break;
      }
      */
     this.incrementTextbox();
     this.incrementImage();
     this.incrementButton();
    })
  }
  

  ngOnInit(): void {
  }

  tbox : number = 0;
  img : number = 0;
  btn : number = 0;
  incrementTextbox(){
    this.tbox++;
    console.log(this.addedPallete);
  }
  incrementImage(){
    this.img++;
    console.log(this.addedPallete);
  }
  incrementButton(){
    this.btn++;
    console.log(this.addedPallete);
  }
}
