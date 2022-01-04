import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-labelDrag',
  templateUrl: './labelDrag.component.html',
  styleUrls: ['./labelDrag.component.css']
})
export class LabelDragComponent implements OnInit, IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'Label',
    class: '',
    style: '',
    typeObj: 'labelDrag',
    type: '',
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
    if(this.whatComponent2=="loginLabelUser")
    {
      this.props.value = "Username";
      this.props.style='position:absolute;left:'
    +(this.dagaX-this.theX)+'px;top:'+(this.dagaY-this.theY)+'px;';
    }
    else if(this.whatComponent2=="loginLabelPass")
    {
      this.props.value = "Password";
      this.props.style='position:absolute;left:'
    +(this.dagaX-this.theX)+'px;top:'+(this.dagaY-this.theY)+'px;';
    }
    else if(this.whatComponent2=="carrierLabel")
    {
      this.props.value="Carrier";
      this.props.style='position:absolute;left:'
    +(this.dagaX-this.theX)+'px;top:'+(this.dagaY-this.theY)+'px;';
    }
    else if(this.whatComponent2=="invoiceFromLabel")
    {
      this.props.value="Invoice number from";
      this.props.style='position:absolute;left:'
    +(this.dagaX-this.theX)+'px;top:'+(this.dagaY-this.theY)+'px;';
    }
    else if(this.whatComponent2=="invoiceToLabel")
    {
      this.props.value="Invoice number to";
      this.props.style='position:absolute;left:'
    +(this.dagaX-this.theX)+'px;top:'+(this.dagaY-this.theY)+'px;';
    }
    else if(this.whatComponent2=="shippingFromLabel")
    {
      this.props.value="Shipping Date from";
      this.props.style='position:absolute;left:'
    +(this.dagaX-this.theX)+'px;top:'+(this.dagaY-this.theY)+'px;';
    }
    else if(this.whatComponent2=="shippingToLabel")
    {
      this.props.value="Shipping Date to";
      this.props.style='position:absolute;left:'
    +(this.dagaX-this.theX)+'px;top:'+(this.dagaY-this.theY)+'px;';
    }
    else if(this.whatComponent2=="addressLabel")
    {
      this.props.value="Address";
      this.props.style='position:absolute;left:'
    +(this.dagaX-this.theX)+'px;top:'+(this.dagaY-this.theY)+'px;';
    }
    else if(this.whatComponent2 == "deliveryNameLabel")
    {
      this.props.value="Delivery name";
      this.props.style='position:absolute;left:'
    +(this.dagaX-this.theX)+'px;top:'+(this.dagaY-this.theY)+'px;';
    }
    else if(this.whatComponent2 == "remarksLabel")
    {
      this.props.value="Remarks";
      this.props.style='position:absolute;left:'
    +(this.dagaX-this.theX)+'px;top:'+(this.dagaY-this.theY)+'px;';
    }
    else
    {
      this.props.style='position:absolute;left:'
    +(this.dagaX-this.theX)+'px;top:'+(this.dagaY-this.theY)+'px;';
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
    this.props.id = 'label' + date.toString();
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
    let tmpHtmlCode = '<label';
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

    tmpHtmlCode += '>' + this.props.value + '</label>';

    return tmpHtmlCode;
  }


}
