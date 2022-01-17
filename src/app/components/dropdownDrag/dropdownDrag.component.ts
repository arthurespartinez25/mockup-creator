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
    links: 3,
    linkValue: 'Sample',
    linksArray:[],
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
  links = this.props.links;
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
  ngAfterViewInIt()
  {
    setTimeout(() => {
      this.props.style='position:sticky;left:'+this.percentageX+'%;top:'+this.percentageY+'%;';
    }, 10);
    
  }

  onDragEnded($event: CdkDragEnd){
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;
    this.updateDataEvent.emit(((this.mousePositionXV2 + this.dagaX - this.theX)/1280)*100);
    this.updateDataEventY.emit(((this.mousePositionYV2 + this.dagaY - this.theY)/720)*100);
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
      this.links = value.links;
      this.editNumLinks(this.props.links);
    }
  }

  editNumLinks = (numLink) => {
    this.props.linksArray = [];
    if (!numLink) {
      console.warn('rows or columns are undefined');
    } else {
      
      for (var i = 0; i < numLink; i++) {
        if(this.props.linkContent) {
          if(this.props.linkContent.length != numLink) {
            this.props.linksArray.push('link' + (i+1));
          }
          else {
            console.log("dito pumasok");
            console.log(this.props.linkContent);
            this.props.linksArray = this.props.linkContent;
          }
        }
        else {
            this.props.linksArray.push('link' + (i+1));
            console.log("pasok noh? oo");
        }
      }
      
    }
    console.log(this.props.linksArray);
  };

  editLinkValue = (index, oldvalue: string, newValue: any) => {
    this.props.linksArray[index] = newValue;
    this.props.linkContent = this.props.linksArray;
    console.log(this.props.linkContent);
    console.log(index, oldvalue, newValue);
  };
  
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

    let tmpHtmlCode = '<div class="btn-group"'+ ' style="' + this.props.style +'"';
    tmpHtmlCode += 'id="' + this.props.id + '">';
    tmpHtmlCode +="\n" + ' <button class="' +  this.props.class + '" type="' +  this.props.type + '" style="' + jude + '"> ' + this.props.value + ' </button>';
    tmpHtmlCode +="\n" + ' <button' + ' type="' +  this.props.type + '" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
    tmpHtmlCode +="\n" + ' <span class="sr-only">Toggle Dropdown</span>';
    tmpHtmlCode +="\n" + ' </button>';
    tmpHtmlCode +="\n" + ' <div class="dropdown-menu">';
    for(var i=0; i<this.props.linksArray.length; i++) {
      tmpHtmlCode +="\n" + ' <a class="dropdown-item" href="#">' + this.props.linksArray[i] + '</a>';
    }
    tmpHtmlCode +="\n" + ' </div>';
    tmpHtmlCode +="\n" + ' </div>';
    

    return tmpHtmlCode;
  }

 

}