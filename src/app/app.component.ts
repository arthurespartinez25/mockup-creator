import {
  DragDrop,
  DragDropConfig,
  DragDropModule,
  DragRef,
  DragRefConfig,
  CdkDrag,
  CdkDragEnd,
  CdkDragStart,
} from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  HostListener ,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'mockup-creator';

  @ViewChild('canvas') canvas!: ElementRef;
  
  constructor(private renderer: Renderer2, private drag: DragDrop) {
    
  }
  changeText= false;
  ngOnInit(): void {
    /* throw new Error('Method not implemented.'); */
  }
  
  mousePosition = {
    x: 0,
    y: 0
  };
  mousePosition2 = {
    x: 0,
    y: 0
  };

  domInsideCanvas = false;
  jude = "false";
  bodyElement: HTMLElement = document.body;

  onMouseDown(event: { screenX: number; screenY: number; }) {
    this.mousePosition.x = event.screenX;
    this.mousePosition.y = event.screenY;

  }


  onDragover() {
    // console.log(event);
    // event.stopPropagation();
    // event.preventDefault();
    // this.domInsideCanvas=true;
    // console.info(this.jude);
    // this.jude = "true";
  }

  onDragout() {
    // event.stopPropagation();
    // event.preventDefault();
    // this.domInsideCanvas=false;
    // console.info(this.domInsideCanvas);
    // this.jude = "false";
  }

  

  createButton( event: { screenX: number; screenY: number; }) {
    //console.log(event.screenX);
    if (this.mousePosition.x === event.screenX && this.mousePosition.y === event.screenY){
    const newButton = this.renderer.createElement('button'); //create dom element
    let ref = this.drag.createDrag(newButton); //make the element draggable with createDrag, then store the reference to ref
    ref.withBoundaryElement(this.canvas); //set the draggable area to only be the canvas
    const text = this.renderer.createText('BUTTON'); //add text to button
    this.renderer.setProperty(newButton, 'type', 'button'); //add type attribute to button
    this.renderer.addClass(newButton, 'btn-primary'); //add css class to the button
    this.renderer.appendChild(newButton, text); //append the text into the button tag
    this.renderer.appendChild(this.canvas.nativeElement, newButton); //append the button to the canvas div
    }
  }

   mouseUp($event: CdkDragEnd){
    if($event.source.element.nativeElement)
    {

    }
    const { offsetLeft, offsetTop } = $event.source.element.nativeElement;
    const { x, y } = $event.distance;
    this.mousePosition2.x = offsetLeft + x;
    this.mousePosition2.y = offsetTop + y;
   }
  
  onDragEndedButton(event: CdkDragEnd){
    event.source._dragRef.reset();
    if(this.domInsideCanvas == true)
    {
      const newButton = this.renderer.createElement('button'); //create dom element
      let ref = this.drag.createDrag(newButton); //make the element draggable with createDrag, then store the reference to ref
      ref.withBoundaryElement(this.canvas); //set the draggable area to only be the canvas
      const text = this.renderer.createText('BUTTON'); //add text to button
      this.renderer.setProperty(newButton, 'type', 'button'); //add type attribute to button
      this.renderer.addClass(newButton, 'btn-primary'); //add css class to the button
      this.renderer.appendChild(newButton, text); //append the text into the button tag
      this.renderer.appendChild(this.canvas.nativeElement, newButton); //append the button to the canvas div
      this.renderer.setStyle(newButton, 'position', 'absolute');
      this.renderer.setStyle(newButton, 'left', this.mousePosition2.x+ "px");
      this.renderer.setStyle(newButton, 'top', this.mousePosition2.y + "px");
      return newButton;
    }
    
}
// other buttons
onDragEnded(event: CdkDragEnd){
  event.source._dragRef.reset();
  
}



  
}
