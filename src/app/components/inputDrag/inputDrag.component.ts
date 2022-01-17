import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-inputDrag',
  templateUrl: './inputDrag.component.html',
  styleUrls: ['./inputDrag.component.css']
})
export class InputDragComponent implements OnInit, IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: '',
    placeholder: 'Input field',
    class: 'form-control',
    style: 'width:200px;',
    typeObj: 'inputDrag',
    type: 'text',
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
  ngAfterViewInit()
  {
    setTimeout(() => {
      if(this.whatComponent2=="loginInputUser")
    {
      this.props.placeholder = "Username";
      this.props.style='width:200px;position:absolute;left:'
      +this.percentageX+'%;top:'+this.percentageY+'%;';
    }
    else if(this.whatComponent2=="loginInputPass")
    {
      this.props.placeholder = "Password";
      this.props.style='width:200px;position:absolute;left:'
      +this.percentageX+'%;top:'+this.percentageY+'%;';
    }
    else if(this.whatComponent2=="carrierInput")
    {
      this.props.placeholder = "xxxxx";
      this.props.style='width:200px;position:absolute;left:'
      +this.percentageX+'%;top:'+this.percentageY+'%;';
    }
    else if(this.whatComponent2=="invoiceInput")
    {
      this.props.placeholder = "xxx-xxxx-xxxx";
      this.props.style='width:200px;position:absolute;left:'
      +this.percentageX+'%;top:'+this.percentageY+'%;';
    }
    else if(this.whatComponent2=="deliveryInput")
    {
      this.props.placeholder = "Enter delivery name";
      this.props.style='width:200px;position:absolute;left:'
      +this.percentageX+'%;top:'+this.percentageY+'%;';
    }
    else if(this.whatComponent2=="addressInput")
    {
      this.props.placeholder = "Enter address";
      this.props.style='width:200px;position:absolute;left:'
      +this.percentageX+'%;top:'+this.percentageY+'%;';
    }
    else if(this.whatComponent2=="remarksInput")
    {
      this.props.placeholder = "Enter remarks";
      this.props.style='width:200px;position:absolute;left:'
      +this.percentageX+'%;top:'+this.percentageY+'%;';
    }
    else
    {
      this.props.style='width:200px;position:absolute;left:'
      +this.percentageX+'%;top:'+this.percentageY+'%;';
    }
    }, 10);
    
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
    this.props.id = 'input' + date.toString();
   }

  @Input() get property(): IProperty {
    return this.props;
  }

  set property(value: IProperty) {
    if (value) {
      this.props = value;
    }
  }

  set textInput(val:string){
    this.props.value = val;
  }

  get htmlCode(): string {
    let tmpHtmlCode = '<input';
    if (this.props.id.trim().length > 0) {
      tmpHtmlCode += ' id="' + this.props.id + '"';
    }

    if (this.props.type.trim().length > 0) {
      tmpHtmlCode += ' type="' + this.props.type + '"';
    }

    if (this.props.class.trim().length > 0) {
      tmpHtmlCode += ' class="' + this.props.class + '"';
    }

    if (this.props.value.trim().length > 0) {
      tmpHtmlCode += ' value="' + this.props.value + '"';
    }

    if (this.props.style.trim().length > 0) {
      tmpHtmlCode += ' style="' + this.props.style + '"';
    }

    tmpHtmlCode += ' placeholder="' + this.props.placeholder + '">';

    return tmpHtmlCode;
  }

}
