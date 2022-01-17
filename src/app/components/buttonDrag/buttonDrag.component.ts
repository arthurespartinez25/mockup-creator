import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-buttonDrag',
  template: `<button cdkDrag cdkDragBoundary="#canvas" 
  [cdkDragDisabled]="!props.draggable"
  (cdkDragEnded)="onDragEnded($event)" [id]="props.id" [style]="props.style" 
  [ngStyle]="{
    'position': 'sticky',
    'left': (dagaX-theX) + 'px',
    'top': (dagaY-theY) + 'px'
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
  percentageX = 0;
  percentageY = 0;

  ngOnInit(): void {
    this.theX = this.xcanvas;
    this.theY = this.ycanvas;
    this.dagaX = this.xmouse;
    this.dagaY = this.ymouse;
    this.percentageX = ((this.xmouse-this.theX)/1280)*100;
    this.percentageY = ((this.ymouse-this.theY)/720)*100;
    
  }

  ngAfterChecked()
  {
    if(this.whatComponent2=="LoginButton")
    {
      this.props.value = "Login";
      this.props.style='position:absolute;left:'+this.percentageX+'%;top:'+this.percentageY+'%;'
      +'width: 20%;max-width: 270px;min-width: 220px; overflow-y: auto;background-color: blue;color: red;border-radius: 10px;'
      +'padding: 5px 10px; border: none;font-weight: bolder; font-size: x-large; margin-bottom: 5px;';
    }
    else if(this.whatComponent2 == "SearchButton")
    {
      this.props.value = "Search";
      this.props.style='position:absolute;left:'+this.percentageX+'%;top:'+this.percentageY+'%;'
      +'background-color: blue;color: white;border-radius: 10px;'
      +'padding: 3px 5px; border: none; font-size: medium; margin-bottom: 5px;';
    }
    else if(this.whatComponent2 == "ClearButton")
    {
      this.props.value = "Clear";
      this.props.style='position:absolute;left:'+this.percentageX+'%;top:'+this.percentageY+'%;'
      +'background-color: gray;color: white;border-radius: 10px;'
      +'padding: 3px 5px; border: none; font-size: medium; margin-bottom: 5px;';
    }
    else if(this.whatComponent2 == "HomeButton")
    {
      this.props.value = "Home";
      this.props.style='position:absolute;left:'+this.percentageX+'%;top:'+this.percentageY+'%;'
      +'background-color: #ADD8E6;color: white;border-radius: 10px;'
      +'padding: 3px 5px; border: none; font-size: medium; margin-bottom: 5px;';
    }
    else if(this.whatComponent2 == "ProfileButton")
    {
      this.props.value = "Profile";
      this.props.style='position:absolute;left:'+this.percentageX+'%;top:'+this.percentageY+'%;'
      +'background-color: #ADD8E6;color: white;border-radius: 10px;'
      +'padding: 3px 5px; border: none; font-size: medium; margin-bottom: 5px;';
    }
    else
    {
      this.props.value = "Button";
      this.props.style='position:absolute;left:'+this.percentageX+'%;top:'+this.percentageY+'%;'
    }
  }

  onDragEnded($event: CdkDragEnd){
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;
    this.updateDataEvent.emit(((this.mousePositionXV2 + this.dagaX - this.theX)/1280)*100);
    this.updateDataEventY.emit(((this.mousePositionYV2 + this.dagaY - this.theY)/720)*100);
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
