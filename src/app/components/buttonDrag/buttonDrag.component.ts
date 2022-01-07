import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-buttonDrag',
  template: `<button cdkDrag cdkDragBoundary="#canvas"
  (cdkDragEnded)="onDragEnded($event)" [id]="props.id" [style]="props.style"
  [ngStyle]="{
    'position': 'fixed',
    'left': dagaX + 'px',
    'top': dagaY + 'px'
  }" [type]="props.type">
    {{ props.value }}
  </button>`,
})

export class ButtonDragComponent implements IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'Button',
    class: '',
    style: '',
    typeObj: 'buttonDrag',
    type: 'button',
  };

  @Output() updateDataEvent= new EventEmitter<any>();
  @Output() updateDataEventY= new EventEmitter<any>();
  @Input() xcanvas: any;
  @Input() ycanvas: any;
  @Input() xmouse: any;
  @Input() ymouse: any;
  @Input() whatComponent2:any;
  mousePositionXV2 = 310;
  mousePositionYV2= 110;
  theX = 0;
  theY = 0;
  dagaX = 0;
  dagaY = 0;
  onetimeBool = true;

  ngOnInit(): void {
    this.theX = this.xcanvas;
    this.theY = this.ycanvas;
    this.dagaX = this.xmouse;
    this.dagaY = this.ymouse;
    let browserWidth = window.innerWidth;
    let widthRes = browserWidth/1280;
    let browserHeight = window.innerHeight;

    //let percentage = 0.85+((browserWidth-1280)/browserWidth); //or you can manually type percentage
    let percentage = ((this.xmouse-this.theX)/1280)*100
    console.log(percentage);
    // let mousepos = this.xmouse-this.theX;
    // let incpercent = ((1280-mousepos)/1280);
    // let addleftpos = mousepos*incpercent;

    if(this.whatComponent2=="LoginButton")
    {
      this.props.value = "Login";
      this.props.style='position:absolute;left:'+(this.xmouse-this.theX)+'px;top:'+(this.ymouse-this.theY)+'px;'
      +'width: 20%;max-width: 270px;min-width: 220px; overflow-y: auto;background-color: blue;color: red;border-radius: 10px;'
      +'padding: 5px 10px; border: none;font-weight: bolder; font-size: x-large; margin-bottom: 5px;';
    }
    else if(this.whatComponent2 == "SearchButton")
    {
      this.props.value = "Search";
      this.props.style='position:absolute;left:'+percentage+'%;top:'+(this.ymouse-this.theY)+'px;'
      +'background-color: blue;color: white;border-radius: 10px;'
      +'padding: 3px 5px; border: none; font-size: medium; margin-bottom: 5px;';
    }
    else if(this.whatComponent2 == "ClearButton")
    {
      this.props.value = "Clear";
      this.props.style='position:absolute;left:'+percentage+'%;top:'+(this.ymouse-this.theY)+'px;'
      +'background-color: gray;color: white;border-radius: 10px;'
      +'padding: 3px 5px; border: none; font-size: medium; margin-bottom: 5px;';
    }
    else if(this.whatComponent2 == "HomeButton")
    {
      this.props.value = "Home";
      this.props.style='position:absolute;left:'+percentage+'%;top:'+(this.ymouse-this.theY)+'px;'
      +'background-color: #ADD8E6;color: white;border-radius: 10px;'
      +'padding: 3px 5px; border: none; font-size: medium; margin-bottom: 5px;';
    }
    else if(this.whatComponent2 == "ProfileButton")
    {
      this.props.value = "Profile";
      this.props.style='position:absolute;left:'+percentage+'%;top:'+(this.ymouse-this.theY)+'px;'
      +'background-color: #ADD8E6;color: white;border-radius: 10px;'
      +'padding: 3px 5px; border: none; font-size: medium; margin-bottom: 5px;';
    }
    else
    {
      this.props.value = "Button";
      this.props.style='position:absolute;left:'+(this.xmouse-this.theX)+'px;top:'+(this.ymouse-this.theY)+'px;';
    }
  }

  onDragEnded($event: CdkDragEnd){
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;
    this.updateDataEvent.emit(this.mousePositionXV2 + this.dagaX - this.theX);
    this.updateDataEventY.emit(this.mousePositionYV2 + this.dagaY - this.theY);
  }


  constructor(canvas: ElementRef) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'button' + date.toString();
  }

  @Input() get property(): IProperty {
    return this.props;
  }

  set property(value: IProperty) {
    if (value) {
      this.props = value;
    }
  }

  get htmlCode(): string {
    let tmpHtmlCode = '<div><button';
    if (this.props.id.trim().length > 0) {
      tmpHtmlCode += ' id="' + this.props.id + '"';
    }

    if (this.props.type.trim().length > 0) {
      tmpHtmlCode += ' type="' + this.props.type + '"';
    }

    if (this.props.class.trim().length > 0) {
      tmpHtmlCode += ' class="' + this.props.class + '"';
    }

    if (this.props.style.trim().length > 0) {
      tmpHtmlCode += ' style="' + this.props.style + '"';
    }

    tmpHtmlCode += '>' + this.props.value + '</button></div>';

    return tmpHtmlCode;
  }

}
