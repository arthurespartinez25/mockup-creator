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
    value: '',
    class: '',
    style: '',
    typeObj: 'dropdownDrag',
    type: '',
    linkValue: ['link1', 'link2', 'link3'],
    linksArray: [],
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
  linkValue = this.props.linkValue;
  selectedOption: string;

  ngOnInit(): void {
    this.canvasPositionLeft = this.canvasPositionX;
    this.canvasPositionTop = this.canvasPositionY;
    this.mousePositionLeft = this.mousePositionX2;
    this.mousePositionTop = this.mousePositionY2;
    this.percentageX = ((this.mousePositionX2 - this.canvasPositionLeft) / 1280) * 100;
    this.percentageY = ((this.mousePositionY2 - this.canvasPositionTop) / 720) * 100;
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
    this.props.id = 'dropdown' + date.toString();
    this.selectedOption = this.linkValue[0];
  }

  @Input() get property(): IProperty {
    return this.props;
  }

  set property(value: IProperty) {
    if (value) {
      this.props = value;
      this.editNumLinks();
      this.linkValue = value.linkValue;
    }
  }

  editNumLinks = () => {
    this.props.linksArray = [];
    var temp;
    
    if(typeof(this.props.linkValue) == 'string') {
      console.log("pasok sa typeof string");
      this.props.linksArray  = this.props.linkValue.split(',');
    } else {
      console.log("pasok sa else");
      this.props.linksArray = this.props.linkValue;
    }
    
    this.props.value = this.selectedOption;
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
