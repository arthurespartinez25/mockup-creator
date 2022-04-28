import {
  CdkDragEnd
} from '@angular/cdk/drag-drop';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IComponent } from './../../../interfaces/icomponent';
import { IProperty } from './../../../interfaces/iproperty';
import { ButtonDragComponent } from './../../../components/buttonDrag/buttonDrag.component';
import { LabelDragComponent } from './../../../components/labelDrag/labelDrag.component';
import { CheckboxDragComponent } from './../../../components/checkboxDrag/checkboxDrag.component';
import { DropdownDragComponent } from './../../../components/dropdownDrag/dropdownDrag.component';
import { ImageDragComponent } from './../../../components/imageDrag/imageDrag.component';
import { DivDragComponent } from './../../../components/divDrag/divDrag.component';
import { RadioDragComponent } from './../../../components/radioDrag/radioDrag.component';
import { TextboxDragComponent } from './../../../components/textboxDrag/textboxDrag.component';
import { PopupDragComponent } from './../../../components/popupDrag/popupDrag.component';
import { ParagraphDragComponent } from './../../../components/paragraphDrag/paragraphDrag.component';
import { NavbarDragComponent } from './../../../components/navbarDrag/navbarDrag.component';
import { ModalDragComponent } from './../../../components/modalDrag/modalDrag.component';
import { DatepickerDragComponent } from './../../../components/datepickerDrag/datepickerDrag.component';
import { HeaderDragComponent } from './../../../components/headerDrag/headerDrag.component';
import { InputDragComponent } from './../../../components/inputDrag/inputDrag.component';
import { LinkDragComponent } from './../../../components/linkDrag/linkDrag.component';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { TableDragComponent } from './../../../components/tableDrag/tableDrag.component';
import { YoutubeDragComponent } from './../../../components/youtubeDrag/youtubeDrag.component';
import { VideoDragComponent } from './../../../components/videoDrag/videoDrag.component';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common'
import { PropertyComponent } from './../../../property/property.component';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit, AfterViewInit, AfterViewChecked {
  title = 'mockup-creator';
  index: number;
  componentList: IComponent[] = [];
  numberOfComponents: any = [];
  selectedComponent: IComponent;
  ref: ComponentRef<any>;
  readonly CSS_URL = '../app/app.component.css';
  refreshCSS = new BehaviorSubject<boolean>(true);
  cssDocument?: StyleSheet;
  users: any;
  

  selected: IProperty = {
    key: '',
    id: '',
    value: '',
    class: '',
    style: '',
    typeObj: '',
    type: '',
    draggable: false,
    selected : false,
    hidden: false,
    mouseDragPositionX: 0,
    mouseDragPositionY: 0,
    finalStyle:'',
    isSavedComponent: false
  };

  public cssRuleCount = document.styleSheets[0].cssRules.length;
  public _popupCount = 0;

  @ViewChild('PropertyComponent') property: boolean;
  @Input() canvas: ElementRef;
  @Input() propertyCmp: PropertyComponent;
  @Input() domInsideCanvas: boolean;
  //@ViewChild('textOp') textBtn!: ElementRef;
  @ViewChild('subMenuItem') subMenuItem!: ElementRef;
  @ViewChild('subMenuItem2') subMenuItem2!: ElementRef;
  //@ViewChild(PropertyComponent) propertyCmp:PropertyComponent;
  @Input() isPlaying: boolean;
  @Input() selectedLanguage: any;

  @Output() updateComponentListEvent = new EventEmitter<IComponent>();
  @Output() updateCanvasLeftEvent = new EventEmitter<number>();
  @Output() updateCanvasTopEvent = new EventEmitter<number>();
  @Output() updateCanvasWEvent = new EventEmitter<number>();
  @Output() updateMousePosX = new EventEmitter<number>();
  @Output() updateMousePosY = new EventEmitter<number>();
  @Output() updateWhatComponentEvent = new EventEmitter<string>();
  changeref: ChangeDetectorRef;
 
  constructor(
    private loginCookie:CookieService,
    changeDetectorRef: ChangeDetectorRef,
    public _router: Router,
    public _location: Location,
    public sanitizer: DomSanitizer,
    public datepipe: DatePipe,
  ) {
    this.changeref = changeDetectorRef;
  }
  delete: boolean;
  cssBody: SafeStyle;
  canvasBG: string;
  canvasLeft = 0;
  canvasTop = 0;
  canvasW = 0;
  whatComponent = 'none';
  sessionID = this.loginCookie.get("sessionID");
  inSession: boolean = this.sessionID == "12345";
  compLanguage: any;

  ngOnInit() {
    if(this.inSession) {
      this._router.navigateByUrl("/canvas");
   
      //api call
      /* this.user.getData().subscribe((data)=> {
        console.warn("get api data", data);
        this.users = data;
      }) */
    }
  }
  ngAfterViewInit(): void {}
  //////////////////////////////////////////////////////////////////////////////
  //   THIS PROJECT WAS STARTED BY BATO BOYS AND CEBU TEAM  
  //                          JUPAO  
  //                          JUDE   
  //                          MARK   
  //                          MIKMIK 
  //                          PHIL   
  //                          RAVEN  
  //                          MERYL  
  //                          VJ     
  //                          JAMES  
  //////////////////////////////////////////////////////////////////////////////
  //                          .-"-.    
  //                         /|6 6|\
  //                        {/(_0_)\}
  //                         _/ ^ \_
  //                        (/ /^\ \)-'
  //                         ""' '""



  canvasLeftX = 0;
  canvasTopY = 0;
  mousePositionX = 110;
  mousePositionY = 110;
  offsetLeft: any = 0;
  offsetTop:any  = 0;
  xDis: any = 0;
  yDis: any = 0;
  noOfButton: number = 0;
  xDistance: any = 0;
  yDistance: any = 0;
  theUsername = "";


  clearComponentList() {
    this.componentList.length = 0;
  }

  updateComponentListDel(value : IComponent[]) {
    this.componentList = value;
  }

  returnComponentList() {
    return this.componentList;
  }

  addComponent(component: string) {
    let temp: IComponent;
    switch (component) {
      case 'button':
        temp = new ButtonDragComponent(this.canvas);
        break;

      case 'label':
        temp = new LabelDragComponent(this.canvas);
        break;

      case 'checkbox':
        temp = new CheckboxDragComponent(this.canvas);
        break;

      case 'dropdown':
        temp = new DropdownDragComponent(this.canvas);
        break;

      case 'img':
        temp = new ImageDragComponent(this.canvas);
        break;

      case 'div':
        temp = new DivDragComponent(this.canvas);
        break;  

      case 'radio':
        temp = new RadioDragComponent(this.canvas);
        break;

      case 'textbox':
        temp = new TextboxDragComponent(this.canvas);
        break;

      case 'popup':
        this._popupCount++;
        temp = new PopupDragComponent(this.canvas);
        break;

      case 'paragraph':
        temp = new ParagraphDragComponent(this.canvas);
        break;

      case 'nav':
        temp = new NavbarDragComponent(this.canvas);
        break;

      case 'modal':
        temp = new ModalDragComponent(this.canvas);
        break;

      case 'datepicker':
        temp = new DatepickerDragComponent(this.canvas, this.datepipe);
        break;

      case 'header':
        temp = new HeaderDragComponent(this.canvas);
        break;

      case 'input':
        temp = new InputDragComponent(this.canvas);
        break;

      case 'link':
        temp = new LinkDragComponent(this.canvas);
        break;

      case 'table':
        temp = new TableDragComponent(this.canvas, this.changeref);
        break;

      case 'youtube':
        temp = new YoutubeDragComponent(this.canvas, this.sanitizer);
        break;
      
      case 'video':
        temp = new VideoDragComponent(this.canvas, this.sanitizer);
        break;

      default:
        temp = new ButtonDragComponent(this.canvas);
    }
    if (component == 'youtube') { //band-aid fix until youtubeComponent gets fixed
      this.canvasLeft = (this.canvas.nativeElement.parentElement.parentElement.parentElement as HTMLElement).offsetLeft;
      this.canvasTop = (this.canvas.nativeElement.parentElement.parentElement.parentElement as HTMLElement).offsetTop;
    } else {
      this.canvasLeft = (this.canvas.nativeElement as HTMLElement).offsetLeft;
      this.canvasTop = (this.canvas.nativeElement as HTMLElement).offsetTop;
    }
    this.canvasW = (this.canvas.nativeElement as HTMLElement).offsetWidth;    
    this.updateCanvasLeftEvent.emit(this.canvasLeft);
    this.updateCanvasTopEvent.emit(this.canvasTop);
    this.updateCanvasWEvent.emit(this.canvasW);
    if (this.domInsideCanvas == false) {
      this.mousePositionX = this.canvasLeft;
      this.mousePositionY = this.canvasTop;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
    }
    ////this.componentList.push(temp);
    this.updateComponentListEvent.emit(temp);
  }
  //----------------------------------------------------------------------------
  onDragEndedAddComponent(event: CdkDragEnd, component: string) {
    event.source._dragRef.reset();
    if (this.domInsideCanvas == true) {
      this.offsetLeft = event.source.element.nativeElement.offsetLeft;
      this.offsetTop = event.source.element.nativeElement.offsetTop;
      this.xDistance = event.distance.x;
      this.yDistance = event.distance.y;
      this.canvasLeftX = (
        this.subMenuItem.nativeElement as HTMLElement
      ).offsetWidth;
      this.canvasTopY = (
        this.subMenuItem.nativeElement as HTMLElement
      ).offsetTop;
      if (
        component == 'img' ||
        component == 'div' ||
        component == 'link' ||
        component == 'table' ||
        component == 'youtube' ||
        component == 'video'
      ) {
        this.canvasLeftX = 0;
        this.canvasTopY = 0;
      } else if ( component == 'nav') {
        this.canvasLeftX = 0;
        this.canvasTopY = 0;
        this.xDistance = 0;
      } else if (
        component == 'header' ||
        component == 'paragraph' ||
        component == 'label'
      ) {
        this.canvasLeftX = (
          this.subMenuItem2.nativeElement as HTMLElement
        ).offsetWidth;
        this.canvasTopY = (
          this.subMenuItem2.nativeElement as HTMLElement
        ).offsetTop;
      }
      this.mousePositionX = this.offsetLeft + this.xDistance + this.canvasLeftX;
      this.mousePositionY = this.offsetTop + this.yDistance + this.canvasTopY;
    }
    console.log(this.mousePositionX)
    console.log(this.mousePositionY)
    this.addComponent(component);
    this.updateMousePosX.emit(this.mousePositionX);
    this.updateMousePosY.emit(this.mousePositionY);
  }
  updateSelectedLanguage(value: any){
    this.selectedLanguage = value;
  }
  //----------------------------------------------------------------------------

  ngAfterViewChecked() {
    this.changeref.detectChanges();
  }
  isDisabled = true;
  timerDisable() {
    setTimeout(() => {
      this.isDisabled = true;
    }, 100);
  }

  /****************** OLD CODE STARTS HERE **********************/
}
function readCSSFile(arg0: string) {
  throw new Error('Function not implemented.');
}