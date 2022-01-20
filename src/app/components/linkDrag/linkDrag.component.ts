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
    class: 'link-primary',
    style: 'text-decoration: none;',
    typeObj: 'linkDrag',
    type: '',
    href: '#',
  };

  @Output() updateDataEvent = new EventEmitter<any>();
  @Output() updateDataEventY = new EventEmitter<any>();
  @Input() xcanvas: any;
  @Input() ycanvas: any;
  @Input() xmouse: any;
  @Input() ymouse: any;
  @Input() whatComponent2: string;
  mousePositionXV2 = 310;
  mousePositionYV2 = 110;
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
    this.percentageX = ((this.xmouse - this.theX) / 1280) * 100;
    this.percentageY = ((this.ymouse - this.theY) / 720) * 100;
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
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;
    this.updateDataEvent.emit(
      ((this.mousePositionXV2 + this.dagaX - this.theX) / 1280) * 100
    );
    this.updateDataEventY.emit(
      ((this.mousePositionYV2 + this.dagaY - this.theY) / 720) * 100
    );
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
