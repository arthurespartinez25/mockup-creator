import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-dropdownDrag',
  templateUrl: './dropdownDrag.component.html',
  styleUrls: ['./dropdownDrag.component.css']
})
export class DropdownDragComponent implements OnInit,IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'Dropdown',
    class: 'btn btn-secondary',
    style: '',
    typeObj: 'dropdownDrag',
    type: 'button',
    link1: 'Link 1',
    link2: 'Link 2',
    link3: 'Link 3',
  };

  @Output() updateDataEvent= new EventEmitter<any>();
  @Output() updateDataEventY= new EventEmitter<any>();
  @Input() xcanvas: any;
  @Input() ycanvas: any;
  @Input() xmouse: any;
  @Input() ymouse: any;
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
    this.props.style='position:sticky;left:'+(this.dagaX-this.theX)+'px;top:'+(this.dagaY-this.theY)+'px;';
  }

  onDragEnded($event: CdkDragEnd){
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;
    this.updateDataEvent.emit(this.mousePositionXV2 + this.dagaX - this.theX);
    this.updateDataEventY.emit(this.mousePositionYV2 + this.dagaY - this.theY);
    console.log(this.mousePositionXV2);
    console.log(this.mousePositionYV2);
  }

  constructor(canvas: ElementRef) { 
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'dropdown' + date.toString();
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
    let jude = this.props.style;
    let regexLeft = /left(.+?);/;
    let regexTop = /top(.+?);/;
    let regexPosition = /position(.+?);/;
    // let styleLeft = jude.match(/left(.+?);/g);
    // let styleTop = jude.match(/top(.+?);/g);
    // console.log(styleLeft);
    // console.log(jude);

    //let divStyle = '"style=position:absolute;left:'+this.dagaX+'px;top:'+this.dagaY+'px;"';

    jude = jude.replace(regexLeft,"");
    jude = jude.replace(regexTop,"");
    jude = jude.replace(regexPosition,"");
    //this.props.style = jude;

    let tmpHtmlCode = '<div'+ '"style="' + this.props.style +'"'
    ;
    tmpHtmlCode += ' class="dropdown" id="' + this.props.id + '">';
    tmpHtmlCode +="\n" + ' <button class="' +  this.props.class + '" type="' +  this.props.type + '" style="' + jude + '" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> ' + this.props.value + ' </button>';
    tmpHtmlCode +="\n" + ' <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
    tmpHtmlCode +="\n" + ' <a class="dropdown-item" href="#">' + this.props.link1 + '</a>';
    tmpHtmlCode +="\n" + ' <a class="dropdown-item" href="#">' + this.props.link2 + '</a>';
    tmpHtmlCode +="\n" + ' <a class="dropdown-item" href="#">' + this.props.link3 + '</a>';
    tmpHtmlCode +="\n" + ' </div>';
    tmpHtmlCode +="\n" + ' </div>';
    

    return tmpHtmlCode;
  }

 

}
