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
    value: 'https://media.istockphoto.com/vectors/stamprsimp2red-vector-id1096052566?k=20&m=1096052566&s=612x612&w=0&h=CPU7LLHBwJm2OKoXCLxqKDzGaR0Xa1WGTQoryfdWQ3g=',
    class: '',
    style: '',
    typeObj: 'imgDrag',
    type: '',
    draggable: true,
    selected : false,
    hidden: false,
    mouseDragPositionX:0,
    mouseDragPositionY:0,
    usedMarginPercent:false
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
  finalStyle: string;

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
        this.props.style =
          'height:100px;width:100px;position:absolute;left:' +
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
    if(this.props.usedMarginPercent){
      if(this.props.style.match(/(margin-left):(\s)*(\d)*\.?(\d)*px;/) && 
        this.props.style.match(/(margin-top):(\s)*(\d)*\.?(\d)*px;/)){
        this.finalStyle = this.props.style.replace(/(margin-left):(\s)*(\d)*\.?(\d)*px;/, "")
        this.finalStyle = this.finalStyle.replace(/(margin-top):(\s)*(\d)*\.?(\d)*px;/, "")
      } else if (this.props.style.match(/(margin-left):(\s)*(\d)*\.?(\d)*px;/)){
        this.finalStyle = this.props.style.replace(/(margin-left):(\s)*(\d)*\.?(\d)*px;/, "")
      } else if (this.props.style.replace(/(margin-top):(\s)*(\d)*\.?(\d)*px;/, "")){
        this.finalStyle = this.props.style.replace(/(margin-top):(\s)*(\d)*\.?(\d)*px;/, "")
        console.log(this.finalStyle)
      }
    } else {
      this.finalStyle = this.props.style;
    }
    let tmpHtmlCode = '<img';
    tmpHtmlCode +=
      ' class="' +
      this.props.class +
      '" id="' +
      this.props.id +
      '" type="' +
      this.props.type +
      '" style="'+
      this.finalStyle +
      '" src = " ' +
      this.props.value +
      '"> </img>';

    return tmpHtmlCode;
  }
}
