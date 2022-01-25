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
    class: '',
    style: 'width:200px;',
    typeObj: 'inputDrag',
    type: 'text',
    draggable: true,
    selected : false,
  };

  @Output() updateDataEvent = new EventEmitter<any>();
  @Output() updateDataEventY = new EventEmitter<any>();
  @Input() canvasPositionX: any;
  @Input() canvasPositionY: any;
  @Input() mousePositionX2: any;
  @Input() mousePositionY2: any;
  @Input() whatComponent2: any;
  mousePositionDropX = 310;
  mousePositionDropY = 110;
  canvasPositionLeft = 0;
  canvasPositionTop = 0;
  mousePositionLeft = 0;
  mousePositionTop = 0;
  percentageX = 0;
  percentageY = 0;

  ngOnInit(): void {
    this.canvasPositionLeft = this.canvasPositionX;
    this.canvasPositionTop = this.canvasPositionY;
    this.mousePositionLeft = this.mousePositionX2;
    this.mousePositionTop = this.mousePositionY2;
    this.percentageX = ((this.mousePositionX2 - this.canvasPositionLeft) / 1280) * 100;
    this.percentageY = ((this.mousePositionY2 - this.canvasPositionTop) / 720) * 100;
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
  }
  

  onDragEnded($event: CdkDragEnd) {
    this.mousePositionDropX = $event.source.getFreeDragPosition().x;
    this.mousePositionDropY = $event.source.getFreeDragPosition().y;
    this.updateDataEvent.emit(
      ((this.mousePositionDropX + this.mousePositionLeft - this.canvasPositionLeft) / 1280) * 100
    );
    this.updateDataEventY.emit(
      ((this.mousePositionDropY + this.mousePositionTop - this.canvasPositionTop) / 720) * 100
    );
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
