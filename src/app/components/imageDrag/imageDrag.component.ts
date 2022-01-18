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
  selector: 'app-imageDrag',
  templateUrl: './imageDrag.component.html',
  styleUrls: ['./imageDrag.component.css'],
})
export class ImageDragComponent implements OnInit, IComponent {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: 'https://mdbootstrap.com/img/new/standard/city/047.jpg',
    class: 'img-rounded',
    style: '',
    typeObj: 'imgDrag',
    type: '',
  };

  @Output() updateDataEvent = new EventEmitter<any>();
  @Output() updateDataEventY = new EventEmitter<any>();
  @Input() xcanvas: any;
  @Input() ycanvas: any;
  @Input() xmouse: any;
  @Input() ymouse: any;
  @Input() whatComponent2: any;
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
      case 'sampleImage':
        this.props.value =
          'https://dlcdnrog.asus.com/rog/media/1610273282904.jpg';
        this.props.style =
          'position:absolute;left:' +
          this.percentageX +
          '%;top:' +
          this.percentageY +
          '%;';
        break;

      case 'HPImage1':
        this.props.style = `height: 390px;
        width: 300px;
        border-radius: 5%;`
        +'position:absolute;left:' +
        this.percentageX +
        '%;top:' +
        this.percentageY
        +'%;';
        this.props.value = /* `https://images-cdn.9gag.com/photo/arVBvwX_700b.jpg` */ `https://media.discordapp.net/attachments/699657972611153982/932194877024907284/gourmet-burger.png`;
        break;
      case 'HPImage2':
        this.props.style = `height: 390px;
        width: 300px;
        border-radius: 5%;`
        +'position:absolute;left:' +
        this.percentageX +
        '%;top:' +
        this.percentageY
        +'%;';
        this.props.value = /* `https://i.pinimg.com/474x/50/8e/4e/508e4e9d7380526dff7e7346f9c5d013.jpg` */ `https://st4.depositphotos.com/8522652/i/600/depositphotos_281396182-stock-photo-karaage-japanese-fried-chicken-with.jpg`;
        break;
      case 'HPImage3':
        this.props.style = `height: 390px;
        width: 300px;
        border-radius: 5%;`
        +'position:absolute;left:' +
        this.percentageX +
        '%;top:' +
        this.percentageY
        +'%;';
        this.props.value = /* `https://external-preview.redd.it/mWEhfBkJ-YMbQAQs5oIYJDWA8IpEXa8DjGO6gk1APNQ.jpg?width=640&crop=smart&auto=webp&s=acb8ce5ac8a5fe870af5a1613b34fb6607e996a2` */ `https://cdn.shopify.com/s/files/1/0353/5621/articles/JAPANESERECIPES6343.jpg?v=1612904909`;
        break;
      case 'HPImage4':
        this.props.style = `height: 390px;
        width: 300px;
        border-radius: 5%;`
        +'position:absolute;left:' +
        this.percentageX +
        '%;top:' +
        this.percentageY
        +'%;';
        this.props.value = `https://www.cookingclassy.com/wp-content/uploads/2019/07/steak-marinade-12-768x1152.jpg`;
        break;

      default:
        this.props.value =
          'https://mdbootstrap.com/img/new/standard/city/047.jpg';
        this.props.style =
          'max-width: 600px;height: 200px;position:absolute;left:' +
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
    tmpHtmlCode +=
      ' class="' +
      this.props.class +
      '" id="' +
      this.props.id +
      '" type="' +
      this.props.type +
      '" style="' +
      this.props.style +
      '" src = " ' +
      this.props.value +
      '"> </img>';

    return tmpHtmlCode;
  }
}
