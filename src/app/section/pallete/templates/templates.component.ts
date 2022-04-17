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
import { ImageDragComponent } from './../../../components/imageDrag/imageDrag.component';
import { ParagraphDragComponent } from './../../../components/paragraphDrag/paragraphDrag.component';
import { NavbarDragComponent } from './../../../components/navbarDrag/navbarDrag.component';
import { DatepickerDragComponent } from './../../../components/datepickerDrag/datepickerDrag.component';
import { HeaderDragComponent } from './../../../components/headerDrag/headerDrag.component';
import { InputDragComponent } from './../../../components/inputDrag/inputDrag.component';
import { LinkDragComponent } from './../../../components/linkDrag/linkDrag.component';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common'
import { PropertyComponent } from './../../../property/property.component';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit, AfterViewInit, AfterViewChecked {
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

  @ViewChild('PropertyComponent') property: boolean;
  @Input() canvas: ElementRef;
  @Input() propertyCmp: PropertyComponent;
  //@ViewChild('textOp') textBtn!: ElementRef;
  @ViewChild('subMenuItem') subMenuItem!: ElementRef;
  @ViewChild('subMenuItem2') subMenuItem2!: ElementRef;
  //@ViewChild(PropertyComponent) propertyCmp:PropertyComponent;
  @Input() isPlaying: boolean;

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
  domInsideCanvas = false;
  offsetLeft: any = 0;
  offsetTop:any  = 0;
  xDis: any = 0;
  yDis: any = 0;
  noOfButton: number = 0;
  xDistance: any = 0;
  yDistance: any = 0;
  theUsername = "";

  ngAfterViewChecked() {
    this.changeref.detectChanges();
  }
  
  addComponentLogin() {
    this.propertyCmp.clearComponent();
    let temp: IComponent;
    temp = new ButtonDragComponent(this.canvas);
    this.canvasLeft = (this.canvas.nativeElement as HTMLElement).offsetLeft;
    this.updateCanvasLeftEvent.emit(this.canvasLeft);
    this.canvasTop = (this.canvas.nativeElement as HTMLElement).offsetTop;
    this.updateCanvasTopEvent.emit(this.canvasTop);
    this.canvasW = (this.canvas.nativeElement as HTMLElement).offsetWidth;
    this.updateCanvasWEvent.emit(this.canvasW);

    this.whatComponent = 'loginHeader';
    this.updateWhatComponentEvent.emit(this.whatComponent);
    temp = new HeaderDragComponent(this.canvas);
    this.mousePositionX = this.canvasLeft + 450;
    this.updateMousePosX.emit(this.mousePositionX);
    this.mousePositionY = this.canvasTop + 140;
    this.updateMousePosY.emit(this.mousePositionY);
    //this.componentList.push(temp);
    this.updateComponentListEvent.emit(temp);
    setTimeout(() => {
      this.whatComponent = 'loginInputUser';      
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new InputDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 530;
      this.mousePositionY = this.canvasTop + 200;      
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'loginLabelUser';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 450;
      this.mousePositionY = this.canvasTop + 200;      
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'loginInputPass';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new InputDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 530;
      this.mousePositionY = this.canvasTop + 250;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'loginLabelPass';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 450;
      this.mousePositionY = this.canvasTop + 250;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'LoginCheckbox';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new CheckboxDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 450;
      this.mousePositionY = this.canvasTop + 300;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'LoginButton';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new ButtonDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 450;
      this.mousePositionY = this.canvasTop + 350;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = '';
      this.updateWhatComponentEvent.emit(this.whatComponent);
    }, 1);
  }
  addComponentImageLabel() {
    this.propertyCmp.clearComponent();
    let temp: IComponent;
    temp = new ButtonDragComponent(this.canvas);
    this.canvasLeft = (this.canvas.nativeElement as HTMLElement).offsetLeft;
    this.updateCanvasLeftEvent.emit(this.canvasLeft);
    this.canvasTop = (this.canvas.nativeElement as HTMLElement).offsetTop;
    this.updateCanvasTopEvent.emit(this.canvasTop);
    this.canvasW = (this.canvas.nativeElement as HTMLElement).offsetWidth;
    this.updateCanvasWEvent.emit(this.canvasW);

    this.whatComponent = 'sampleImage';
    this.updateWhatComponentEvent.emit(this.whatComponent);
    temp = new ImageDragComponent(this.canvas);
    this.mousePositionX = this.canvasLeft + 450;
    this.mousePositionY = this.canvasTop + 140;    
    this.updateMousePosX.emit(this.mousePositionX);
    this.updateMousePosY.emit(this.mousePositionY);
    //this.componentList.push(temp);
    this.updateComponentListEvent.emit(temp);
  }

  addComponentHomePage() {
    this.propertyCmp.clearComponent();
    let temp: IComponent;
    this.canvasLeft = (this.canvas.nativeElement as HTMLElement).offsetLeft;
    this.updateCanvasLeftEvent.emit(this.canvasLeft);
    this.canvasTop = (this.canvas.nativeElement as HTMLElement).offsetTop;
    this.updateCanvasTopEvent.emit(this.canvasTop);
    this.canvasW = (this.canvas.nativeElement as HTMLElement).offsetWidth;
    this.updateCanvasWEvent.emit(this.canvasW);
  
    this.whatComponent = 'HPNav1';
    this.updateWhatComponentEvent.emit(this.whatComponent);
    temp = new NavbarDragComponent(this.canvas);
    this.mousePositionX = this.canvasLeft;
    this.mousePositionY = this.canvasTop + 40;
    this.updateMousePosX.emit(this.mousePositionX);
    this.updateMousePosY.emit(this.mousePositionY);

    //this.componentList.push(temp);
    this.updateComponentListEvent.emit(temp);

    setTimeout(() => {
      this.whatComponent = 'HPNav2';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new NavbarDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft;
      this.mousePositionY = this.canvasTop;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);

      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);

    setTimeout(() => {
      this.whatComponent = 'HPP8';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new ParagraphDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 1050;
      this.mousePositionY = this.canvasTop;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);

      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);

    setTimeout(() => {
      this.whatComponent = 'HPLink7';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LinkDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 980;
      this.mousePositionY = this.canvasTop + 60;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);

    setTimeout(() => {
      this.whatComponent = 'HPLink8';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LinkDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 1080;
      this.mousePositionY = this.canvasTop + 60;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);

    setTimeout(() => {
      this.whatComponent = 'HPLink9';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LinkDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 1210;
      this.mousePositionY = this.canvasTop + 60;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);

    setTimeout(() => {
      this.whatComponent = 'HPLabel1';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 20;
      this.mousePositionY = this.canvasTop + 65;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);

    setTimeout(() => {
      this.whatComponent = 'HPLink1';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LinkDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 20;
      this.mousePositionY = this.canvasTop + 100;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPLink2';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LinkDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 120;
      this.mousePositionY = this.canvasTop + 100;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPLink3';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LinkDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 200;
      this.mousePositionY = this.canvasTop + 100;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPNav3';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new NavbarDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft;
      this.mousePositionY = this.canvasTop + 140;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);

    setTimeout(() => {
      this.whatComponent = 'HPLabel2';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 600;
      this.mousePositionY = this.canvasTop + 160;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);

    setTimeout(() => {
      this.whatComponent = 'HPLabel3';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 540;
      this.mousePositionY = this.canvasTop + 200;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPLink4';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LinkDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 430;
      this.mousePositionY = this.canvasTop + 240;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPLink5';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LinkDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 560;
      this.mousePositionY = this.canvasTop + 240;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPLink6';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LinkDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 690;
      this.mousePositionY = this.canvasTop + 240;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);

    setTimeout(() => {
      this.whatComponent = 'HPImage2';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new ImageDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 330;
      this.mousePositionY = this.canvasTop + 300;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPImage3';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new ImageDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 645;
      this.mousePositionY = this.canvasTop + 300;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPImage1';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new ImageDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 15;
      this.mousePositionY = this.canvasTop + 300;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);

    setTimeout(() => {
      this.whatComponent = 'HPP2';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new ParagraphDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 960;
      this.mousePositionY = this.canvasTop + 300;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPP3';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new ParagraphDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 960;
      this.mousePositionY = this.canvasTop + 400;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPP4';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new ParagraphDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 960;
      this.mousePositionY = this.canvasTop + 500;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPP5';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new ParagraphDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 960;
      this.mousePositionY = this.canvasTop + 350;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPP6';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new ParagraphDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 960;
      this.mousePositionY = this.canvasTop + 450;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPP7';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new ParagraphDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 960;
      this.mousePositionY = this.canvasTop + 550;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = '';
      this.updateWhatComponentEvent.emit(this.whatComponent);
    }, 100);
  }

  addComponentSearchScreen() {
    //Jan 3, 2021 - 1:20pm
    //left side of the form
    this.propertyCmp.clearComponent();
    let temp: IComponent;
    temp = new ButtonDragComponent(this.canvas);
    this.canvasLeft = (this.canvas.nativeElement as HTMLElement).offsetLeft;
    this.updateCanvasLeftEvent.emit(this.canvasLeft);
    this.canvasTop = (this.canvas.nativeElement as HTMLElement).offsetTop;
    this.updateCanvasTopEvent.emit(this.canvasTop);
    this.canvasW = (this.canvas.nativeElement as HTMLElement).offsetWidth;
    this.updateCanvasWEvent.emit(this.canvasW);

    //navbar
    this.whatComponent = 'searchNavbar';
    this.updateWhatComponentEvent.emit(this.whatComponent);
    temp = new NavbarDragComponent(this.canvas);
    this.mousePositionX = this.canvasLeft + 250;
    this.mousePositionY = this.canvasTop;
    this.updateMousePosX.emit(this.mousePositionX);
    this.updateMousePosY.emit(this.mousePositionY);
    //this.componentList.push(temp);
    this.updateComponentListEvent.emit(temp);

    setTimeout(() => {
      this.whatComponent = 'userIDLabel';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 980;
      this.mousePositionY = this.canvasTop + 10;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'usernameLabel';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 1036;
      this.mousePositionY = this.canvasTop + 10;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HomeButton';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new ButtonDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 1140;
      this.mousePositionY = this.canvasTop + 8;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'ProfileButton';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new ButtonDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 1210;
      this.mousePositionY = this.canvasTop + 8;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);

    //body
    setTimeout(() => {
      this.whatComponent = 'searchHeader';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new HeaderDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 250;
      this.mousePositionY = this.canvasTop + 140;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'carrierInput';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new InputDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 320;
      this.mousePositionY = this.canvasTop + 200;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'carrierLabel';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 240;
      this.mousePositionY = this.canvasTop + 210;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'invoiceInput';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new InputDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 320;
      this.mousePositionY = this.canvasTop + 250;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'invoiceFromLabel';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 155;
      this.mousePositionY = this.canvasTop + 260;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      temp = new DatepickerDragComponent(this.canvas, this.datepipe);
      this.mousePositionX = this.canvasLeft + 320;
      this.mousePositionY = this.canvasTop + 310;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'shippingFromLabel';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 162;
      this.mousePositionY = this.canvasTop + 310;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'deliveryInput';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new InputDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 320;
      this.mousePositionY = this.canvasTop + 350;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'deliveryNameLabel';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 195;
      this.mousePositionY = this.canvasTop + 360;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'addressInput';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new InputDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 320;
      this.mousePositionY = this.canvasTop + 400;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'addressLabel';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 235;
      this.mousePositionY = this.canvasTop + 410;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'remarksInput';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new InputDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 320;
      this.mousePositionY = this.canvasTop + 450;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'remarksLabel';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 230;
      this.mousePositionY = this.canvasTop + 460;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);

    // right side of the form
    setTimeout(() => {
      this.whatComponent = 'invoiceInput';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new InputDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 720;
      this.mousePositionY = this.canvasTop + 200;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'invoiceToLabel';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 575;
      this.mousePositionY = this.canvasTop + 210;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      temp = new DatepickerDragComponent(this.canvas, this.datepipe);
      this.mousePositionX = this.canvasLeft + 720;
      this.mousePositionY = this.canvasTop + 250;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'shippingToLabel';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 580;
      this.mousePositionY = this.canvasTop + 250;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);

    //buttons
    setTimeout(() => {
      this.whatComponent = 'SearchButton';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new ButtonDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 900;
      this.mousePositionY = this.canvasTop + 500;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'ClearButton';
      this.updateWhatComponentEvent.emit(this.whatComponent);
      temp = new ButtonDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 965;
      this.mousePositionY = this.canvasTop + 500;
      this.updateMousePosX.emit(this.mousePositionX);
      this.updateMousePosY.emit(this.mousePositionY);
      //this.componentList.push(temp);
      this.updateComponentListEvent.emit(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = '';
      this.updateWhatComponentEvent.emit(this.whatComponent);
    }, 100);
  }


  /****************** OLD CODE STARTS HERE **********************/
}
function readCSSFile(arg0: string) {
  throw new Error('Function not implemented.');
}

