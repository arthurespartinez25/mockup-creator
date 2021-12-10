import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})

export class ImageComponent implements OnInit, IComponent {
  canvas: ElementRef;
    props: IProperty = {
      key: '',
      id: '',
      value: 'https://mdbootstrap.com/img/new/standard/city/047.jpg',
      class: 'img-rounded',
      style: '',
      typeObj: 'img',
      type: '',
    };

    constructor(canvas: ElementRef) {
      this.canvas = canvas;
      let date = Date.now();
      this.props.key = date.toString();
      this.props.id = 'img' + date.toString();
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
      let tmpHtmlCode = '<img';
      tmpHtmlCode += ' class="' + this.props.class + '" id="' + this.props.id + '" type="' +  this.props.type 
       '" style="' + this.props.style + '" src = " ' + this.props.value + '"> </img>';
      
      return tmpHtmlCode;
    }

    ngOnInit(): void {
    }
}
