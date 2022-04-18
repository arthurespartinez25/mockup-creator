import { LinkDragComponent } from './components/linkDrag/linkDrag.component';
import { ElementsComponent } from './section/pallete/elements/elements.component';

import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IComponent, defaultProps } from './interfaces/icomponent';
import { IProperty } from './interfaces/iproperty';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common'
import { PropertyComponent } from './property/property.component';
import { CanvasComponent } from './section/canvas/canvas.component';
import { PalleteComponent } from './section/pallete/pallete.component';
import { CodeComponent } from './section/code/code.component';
import { VideoDragComponent } from './components/videoDrag/videoDrag.component';
import { HttpClient } from '@angular/common/http';
import { NavbarDragComponent } from './components/navbarDrag/navbarDrag.component';
import { TableDragComponent } from './components/tableDrag/tableDrag.component';
import { ButtonDragComponent } from './components/buttonDrag/buttonDrag.component';
import { ImageDragComponent } from './components/imageDrag/imageDrag.component';
import { LabelDragComponent } from './components/labelDrag/labelDrag.component';
import { CheckboxDragComponent } from './components/checkboxDrag/checkboxDrag.component';
import { DropdownDragComponent } from './components/dropdownDrag/dropdownDrag.component';
import { DivDragComponent } from './components/divDrag/divDrag.component';
import { RadioDragComponent } from './components/radioDrag/radioDrag.component';
import { TextboxDragComponent } from './components/textboxDrag/textboxDrag.component';
import { ParagraphDragComponent } from './components/paragraphDrag/paragraphDrag.component';
import { DatepickerDragComponent } from './components/datepickerDrag/datepickerDrag.component';
import { HeaderDragComponent } from './components/headerDrag/headerDrag.component';
import { InputDragComponent } from './components/inputDrag/inputDrag.component';
import { YoutubeDragComponent } from './components/youtubeDrag/youtubeDrag.component';
import { AppLoginComponent } from './app-login/app-login.component';

export class List {
  constructor(
    public id: number,
    public tabs_id: string,
    public componentID: string,
    public componentValue: string,
    public componentClass: string,
    public componentStyle: string,
    public componentTypeObj: string,
    public componentType: string,
    public componentDraggable: string,
    public componentPositionX: string,
    public componentPositionY: string,
    public componentOptionValues: string,
    public componentHREF: string,
    public componentName: string,
    public componentPlaceholder: string,
    public componentColumns: number,
    public componentRows: number,
    public componentFinalStyle: string,
    public componentIsIcon: string,
    public componentIconValue: string,
    public componentIconLabel1: string,
    public componentIconLabel2: string,
    public componentTarget: string,
    public componentRedirection: string
  ){}
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.palette.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {
  title = 'mockup-creator';
  index: number;
  componentList: IComponent[] = [];
  componentListMap = new Map<string, IComponent[]>();
  numberOfComponents: any = [];
  selectedComponent: IComponent;
  ref: ComponentRef<any>;
  readonly CSS_URL = '../app/app.component.css';
  refreshCSS = new BehaviorSubject<boolean>(true);
  cssDocument?: StyleSheet;
  users: any;
  tabList: any;
  components: List[]

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
    isSavedComponent:false
  };

  public cssRuleCount = document.styleSheets[0].cssRules.length;
  public _popupCount = 0;

  @ViewChild('PropertyComponent') property: boolean;
  @ViewChild(CanvasComponent) canvas!: CanvasComponent;
  //@ViewChild('canvas') canvas!: ElementRef;
  @ViewChild(PalleteComponent) palette: PalleteComponent; 
  @ViewChild(ElementsComponent) elements: ElementsComponent;
  @ViewChild(CodeComponent) code: CodeComponent;
  //@ViewChild('textOp') textBtn!: ElementRef;
  @ViewChild('subMenuItem') subMenuItem!: ElementRef;
  @ViewChild('subMenuItem2') subMenuItem2!: ElementRef;
  @ViewChild(AppLoginComponent) login:AppLoginComponent;
  
  changeref: ChangeDetectorRef;
  userID: any;
  constructor(
    private loginCookie:CookieService,
    changeDetectorRef: ChangeDetectorRef,
    public _router: Router,
    public _location: Location,
    public sanitizer: DomSanitizer,
    public datepipe: DatePipe,
    private httpClient: HttpClient
  ) {
    this.changeref = changeDetectorRef;
  }
  delete: boolean;
  cssBody: SafeStyle;
  canvasDirective: any;
  passCanvas: ElementRef;
  propertyCmp : PropertyComponent;
  canvasBG: string;
  style: string;
  projectName: string = "";
  currentTab = "canvas1";
  canvasLeft = 0;
  canvasTop = 0;
  canvasW = 0;
  whatComponent = 'none';
  sessionID = this.loginCookie.get("sessionID");
  inSession: boolean = this.sessionID == "12345";
  isPlaying: boolean;
  isLoaded:any;
  canvasArray: ElementRef[]

  ngOnInit() {
    console.log(this.sessionID);
    if(this.sessionID) {
      this._router.navigateByUrl("/canvas");
      //api call
      //  this.users.getData().subscribe((data)=> {
      //   console.warn("get api data", data);
      //   this.users = data;
      // }) 
    }
    // this.getComponents()
  }
  ngAfterViewInit(): void {
    this.canvasDirective = this.canvas.passCanvas();    
    this.passCanvas = this.canvasDirective;
  }
  getComponents(){
    this.httpClient.get<any>('http://localhost:8000/getComponents/user1_proj1').subscribe(
      response=>{
        this.components=response;
        for(let i=0; i<this.components.length; i++){
          let props: IProperty= {
            key: this.components[i].componentID.replace(/\D/g, ""),
            id: this.components[i].componentID,
            value: this.components[i].componentValue,
            class: this.components[i].componentClass,
            style: this.components[i].componentFinalStyle,
            typeObj: this.components[i].componentTypeObj,
            type: this.components[i].componentType,
            draggable: JSON.parse(this.components[i].componentDraggable),
            selected : false,
            hidden: false,
            mouseDragPositionX:Number(this.components[i].componentPositionX),
            mouseDragPositionY:Number(this.components[i].componentPositionY),
            finalStyle: this.components[i].componentFinalStyle,
            href: this.components[i].componentHREF,
            placeholder: this.components[i].componentPlaceholder,
            tblCols: Number(this.components[i].componentColumns),
            tblArrayRow: Number(this.components[i].componentRows),
            isIcon: JSON.parse(this.components[i].componentIsIcon),
            iconValue: this.components[i].componentIconValue,
            iconLabel1: this.components[i].componentIconLabel1,
            iconLabel2: this.components[i].componentIconLabel2,
            target: JSON.parse(this.components[i].componentTarget),
            redirection: this.components[i].componentRedirection,
            isSavedComponent: true
          }
          switch(props.typeObj){
            case 'buttonDrag':
              this.updateComponentList(new ButtonDragComponent(this.passCanvas));
              break;
            case 'labelDrag':
              this.updateComponentList(new LabelDragComponent(this.passCanvas));
              break;
            case 'checkboxDrag':
              this.updateComponentList(new CheckboxDragComponent(this.passCanvas));
              break;
            case 'dropdownDrag':
              this.updateComponentList(new DropdownDragComponent(this.passCanvas));
              break;
            case 'imgDrag':
              this.updateComponentList(new ImageDragComponent(this.passCanvas));
              break;
            case 'divDrag':
              this.updateComponentList(new DivDragComponent(this.passCanvas));
              break;
            case 'radioDrag':
              this.updateComponentList(new RadioDragComponent(this.passCanvas));
              break;
            case 'textboxDrag':
              this.updateComponentList(new TextboxDragComponent(this.passCanvas));
              break;
            case 'paragraphDrag':
              this.updateComponentList(new ParagraphDragComponent(this.passCanvas));
              break;
            case 'navDrag':
              this.updateComponentList(new NavbarDragComponent(this.passCanvas));
              break;
            case 'datepickerDrag':
              this.updateComponentList(new DatepickerDragComponent(this.passCanvas, this.datepipe));
              break;
            case 'headerDrag':
              this.updateComponentList(new HeaderDragComponent(this.passCanvas));
              break;
            case 'inputDrag':
              this.updateComponentList(new InputDragComponent(this.passCanvas));
              break;
            case 'linkDrag':
              this.updateComponentList(new LinkDragComponent(this.passCanvas));
              break;
            case 'tableDrag':
              this.updateComponentList(new TableDragComponent(this.passCanvas, this.changeref));
              break;
            case 'youtubeDrag':
              this.updateComponentList(new YoutubeDragComponent(this.passCanvas, this.sanitizer));
              break;
            case 'videoDrag':
              this.updateComponentList(new VideoDragComponent(this.passCanvas, this.sanitizer));
              break;
          } 
          this.componentListMap.forEach(component=>{
            Object.keys(component[i].props).forEach(key=>component[i].props[key]=props[key])
          });
        }
      }
    )
  }

  updateComponentList(components: IComponent) {
    //this.componentList.push(components);

    let tempCompList: IComponent[] = [];
    if (this.componentListMap.has(this.currentTab)) {
      tempCompList = this.componentListMap.get(this.currentTab)!;
    }
    tempCompList.push(components);
    this.componentListMap.set(this.currentTab, tempCompList);
    
    this.componentList = this.componentListMap.get(this.currentTab)!;
    //this.palette.updateComponentListDel(this.componentList); //updates the componentList in the pallete
  }
  
  updateCanvasLeft(value: number) {
    this.canvasLeft = value;
  }

  updateCanvasTop(value: number) {
    this.canvasTop = value;
  }

  updateCanvasW(value: number) {
    this.canvasW = value;
  }

  updateMousePositionX(value: number) {
    this.mousePositionX = value;
  }

  updateMousePositionY(value: number) {
    this.mousePositionY = value;
  }

  updateWhatComponent(value: string) {
    this.whatComponent = value;
  }
  
  updatePropertyComponent(value: PropertyComponent) {
    this.propertyCmp = value;
  }

  clearComponentList() {
    this.palette.clearComponentList();
    this.componentList.length = 0;
  }

  updateComponentListDel(value: IComponent[]) {
    //this.palette.updateComponentListDel(value);
    this.componentList = value;
  }

  updateSelectedTab(value: string) {
    this.currentTab = value;
    if (this.componentListMap.has(this.currentTab)) {
      this.componentList = this.componentListMap.get(this.currentTab)!;
    } else {
      this.componentList = [];
    }
  }

  updateComponentListMap(value: Map<string, IComponent[]>) {
    this.componentListMap = value;
  }

  updateSelectedCanvas(value: ElementRef) {
    this.passCanvas = value;
  }

  updateStyleEvent(value: string) {
    this.style = value;
  }

  updateTabList(value: any) {
    this.tabList = value;
  }

  updateProjectName(value: string) {
    this.projectName = value;
  }

  updateIsPlayingEvent(value: any) {
    this.isPlaying = value;
  }

  updateIsLoadedEvent(value: boolean){
    this.isLoaded = value;
  }
  updateCanvasArray(value: any){
    this.canvasArray=value;
    console.log(value)
  }
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
  domInsideCanvas: boolean;
  offsetLeft: any = 0;
  offsetTop:any  = 0;
  xDis: any = 0;
  yDis: any = 0;
  noOfButton: number = 0;
  xDistance: any = 0;
  yDistance: any = 0;
  theUsername = "";

  loggedIn($event) {
    /* console.log("eto value natin lods: " + this.sessionID); */
    this.theUsername = $event;
    console.log(this.theUsername as string);
    console.log("nakapagpasa na po");
  }

  updateSelected(value: IProperty) {
    this.selected = value;
  }

  updateSelectedComponent(value: IComponent) {
    this.selectedComponent = value;
  }
  updateDomInsideCanvas(value: boolean){
    this.domInsideCanvas = value;
  }

  //----------------------------------------------------------------------------

  ngAfterViewChecked() {
    this.changeref.detectChanges();
  }
  /****************** OLD CODE STARTS HERE **********************/
}
function readCSSFile(arg0: string) {
  throw new Error('Function not implemented.');
}
