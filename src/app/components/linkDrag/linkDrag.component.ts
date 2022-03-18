import { CdkDragEnd } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-linkDrag',
  templateUrl: './linkDrag.component.html',
  styleUrls: ['./linkDrag.component.css'],
})
export class LinkDragComponent implements OnInit, IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'Link',
    class: '',
    style: 'text-decoration: none;',
    typeObj: 'linkDrag',
    type: '',
    draggable: true,
    selected : false,
    hidden: false,
    mouseDragPositionX:0,
    mouseDragPositionY:0,
    href: '#',
  };

  @Input() canvasPositionX: any;
  @Input() canvasPositionY: any;
  @Input() mousePositionX2: any;
  @Input() mousePositionY2: any;
  @Input() whatComponent2: any;
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
    this.props.mouseDragPositionX = this.percentageX;
    this.props.mouseDragPositionY = this.percentageY;
    switch (this.whatComponent2) {
      case 'HPLink1':
        this.props.style = `color: white;
        font-family: Georgia,  serif;
        font-size: 15px;
        text-decoration: none;
        letter-spacing: 0.1em;
        position: sticky; left:`+this.percentageX+`%; top:`+this.percentageY+`%;`;
        this.props.value = `Branches`;
        break;
      case 'HPLink2':
        this.props.style = `color: white;
        font-family: Georgia,  serif;
        font-size: 15px;
        text-decoration: none;
        letter-spacing: 0.1em;
        position: sticky; left:`+this.percentageX+`%; top:`+this.percentageY+`%;`;
        this.props.value = `Events`;
        break;
      case 'HPLink3':
        this.props.style = `color: white;
        font-family: Georgia,  serif;
        font-size: 15px;
        text-decoration: none;
        letter-spacing: 0.1em;
        position: sticky; left:`+this.percentageX+`%; top:`+this.percentageY+`%;`;
        this.props.value = `Contact`;
        break;
      case 'HPLink4':
        this.props.style = `color: white;
        font-family: Georgia,  serif;
        font-size: 12px;
        letter-spacing: 0.1em;
        text-decoration: none;
        position: sticky; left:`+this.percentageX+`%; top:`+this.percentageY+`%;`;
        this.props.value = `THEMED MENU`;
        break;
      case 'HPLink5':
        this.props.style = `color: white;
        font-family: Georgia,  serif;
        font-size: 12px;
        letter-spacing: 0.1em;
        text-decoration: none;
        position: sticky; left:`+this.percentageX+`%; top:`+this.percentageY+`%;`;
        this.props.value = `Dec. 31 - Feb. 20`;
        break;
      case 'HPLink6':
        this.props.style = `color: white;
        font-family: Georgia,  serif;
        font-size: 12px;
        letter-spacing: 0.1em;
        text-decoration: none;
        position: sticky; left:`+this.percentageX+`%; top:`+this.percentageY+`%;`;
        this.props.value = `TIME LIMITED KAARAGE`;
        break;
      case 'HPLink7':
        this.props.style = `color: white;
        font-family: Georgia,  serif;
        font-size: 15px;
        text-decoration: none;
        position: sticky; left:`+this.percentageX+`%; top:`+this.percentageY+`%;`;
        this.props.value = `Our Story`;
        break;
      case 'HPLink8':
        this.props.style = `color: white;
        font-family: Georgia,  serif;
        font-size: 15px;
        text-decoration: none;
        position: sticky; left:`+this.percentageX+`%; top:`+this.percentageY+`%;`;
        this.props.value = `Opportunities`;
        break;
      case 'HPLink9':
        this.props.style = `color: white;
        font-family: Georgia,  serif;
        font-size: 15px;
        text-decoration: none;
        position: sticky; left:`+this.percentageX+`%; top:`+this.percentageY+`%;`;
        this.props.value = `Careers`;
        break;

      default:
        this.props.style =
          'text-decoration: none;position:sticky;left:' +
          this.percentageX +
          '%;top:' +
          this.percentageY +
          '%;';
        break;
    }
  }

  onDragEnded($event: CdkDragEnd) {
    this.props.mouseDragPositionX =
    (( $event.source.getFreeDragPosition().x+ this.mousePositionLeft - this.canvasPositionLeft) / 1280) 
    * 100;
    this.props.mouseDragPositionY =
    (( $event.source.getFreeDragPosition().y+ this.mousePositionTop - this.canvasPositionTop) / 720) 
    * 100;
  }

  constructor(canvas: ElementRef) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'link' + date.toString();
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
    let tmpHtmlCode = '<a';
    if(this.props.href != undefined){
      if(this.props.href?.trim().length > 0){
      tmpHtmlCode += ' href="' + this.props.href + '"';
      }
    }

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

    tmpHtmlCode += '>' + this.props.value + '</a>';

    return tmpHtmlCode;
  }
}
