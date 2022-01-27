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
  selector: 'app-dropdownDrag',
  templateUrl: './dropdownDrag.component.html',
  styleUrls: ['./dropdownDrag.component.css'],
})
export class DropdownDragComponent implements OnInit, IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'Dropdown',
    class: 'btn btn-secondary dropdown-toggle',
    style: '',
    typeObj: 'dropdownDrag',
    type: 'button',
    links: 3,
    linkValue: 'Sample',
    linksArray: [],
    draggable: true,
    selected : false,
    mouseDragPositionX:0,
    mouseDragPositionY:0,
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
  links = this.props.links;

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
      case 'HPDropdown1':
        break;

      default:
        this.props.style =
          'position:sticky;left:' +
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
        if (this.props.linkContent) {
          if (this.props.linkContent.length != numLink) {
            this.props.linksArray.push('link' + (i + 1));
          } else {
            console.log('dito pumasok');
            console.log(this.props.linkContent);
            this.props.linksArray = this.props.linkContent;
          }
        } else {
          this.props.linksArray.push('link' + (i + 1));
          console.log('pasok noh? oo');
        }
      }
    }
    console.log(this.props.linksArray);
  };

  buttonClicked = () => { 
    console.log("pasok sa click");
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

    jude = jude.replace(regexLeft, '');
    jude = jude.replace(regexTop, '');
    jude = jude.replace(regexPosition, '');
    //this.props.style = jude;

    let tmpHtmlCode =
      '<div class="btn-group"' + ' style="' + this.props.style + '"';
    tmpHtmlCode += 'id="' + this.props.id + '">';
    tmpHtmlCode += '\n' + ' <button class="' + this.props.class +'" type="' + this.props.type +'" style="' + jude + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> ' + this.props.value + ' </button>';
    tmpHtmlCode += '\n' + ' <div class="dropdown-menu" aria-labelledby="'+ this.props.id +'">';

    for (var i = 0; i < this.props.linksArray.length; i++) {
      tmpHtmlCode +=
        '\n' +
        ' <a class="dropdown-item" href="#">' +
        this.props.linksArray[i] +
        '</a>';
    }
    tmpHtmlCode += '\n' + ' </div>';
    tmpHtmlCode += '\n' + ' </div>';

    return tmpHtmlCode;
  }
}
