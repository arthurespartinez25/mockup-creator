import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit,IComponent {
  
  canvas: ElementRef;
  value = '';

  

  props: IProperty = {
    key: '',
    id: '',
    value: 'Dropdown',
    class: 'btn btn-secondary',
    style: '',
    typeObj: 'dropdown',
    type: 'button',
    links: 3,
    linksArray:[],
  };

  @Output() updateDataEvent= new EventEmitter<any>();
  @Output() updateDataEventY= new EventEmitter<any>();
  @Input() xcanvas: any;
  @Input() ycanvas: any;
  mousePositionXV2 = 310;
  mousePositionYV2= 110;
  theX = 0;
  theY = 0;
  links = this.props.links;

  ngOnInit(): void {
    //this.drag.createDrag(this.ref).withBoundaryElement(this.canvas);
    this.theX = this.xcanvas;
    this.theY = this.ycanvas;
  }

  onDragEnded($event: any){
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;
    
    this.updateDataEvent.emit(this.mousePositionXV2);
    this.updateDataEventY.emit(this.mousePositionYV2);
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
        this.props.linksArray.push([]);
        console.log("pasok ba?")
      }

      for (var i = 0; i < numLink; i++) {
          
        this.props.linksArray[i].push('link' + i);
        console.log("oo");
        
      }
      
    }
    console.log(this.props.linksArray.length);
    
  };

  get htmlCode(): string {
    let tmpHtmlCode = '<div';
    tmpHtmlCode += ' class="dropdown" id="' + this.props.id + '">';
    tmpHtmlCode +="\n" + ' <button class="' +  this.props.class + '" type="' +  this.props.type + '" style="' + this.props.style + '" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> ' + this.props.value + ' </button>';
    tmpHtmlCode +="\n" + ' <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
    tmpHtmlCode +="\n" + ' <a class="dropdown-item" href="#">' + this.props.link1 + '</a>';
    tmpHtmlCode +="\n" + ' <a class="dropdown-item" href="#">' + this.props.link2 + '</a>';
    tmpHtmlCode +="\n" + ' <a class="dropdown-item" href="#">' + this.props.link3 + '</a>';
    tmpHtmlCode +="\n" + ' </div>';
    tmpHtmlCode +="\n" + ' </div>';
    
  
    return tmpHtmlCode;
  } 

}
