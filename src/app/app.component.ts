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
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IComponent } from './interfaces/icomponent';
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
    public componentDraggable: boolean,
    public componentPositionX: string,
    public componentPositionY: string,
    public componentOptionValues: string,
    public componentHREF: string,
    public componentName: string,
    public componentPlaceholder: string,
    public componentColumns: number,
    public componentRows: number
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
    finalStyle:''
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
  //@ViewChild(PropertyComponent) propertyCmp:PropertyComponent;
  
  changeref: ChangeDetectorRef;
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

  ngOnInit() {
    console.log(this.inSession);
    if(this.inSession) {
      this._router.navigateByUrl("/canvas");
      //api call
      /* this.user.getData().subscribe((data)=> {
        console.warn("get api data", data);
        this.users = data;
      }) */
    }
    // this.getComponents()
  }
  ngAfterViewInit(): void {     
    this.canvasDirective = this.canvas.passCanvas();    
    this.passCanvas = this.canvasDirective;
  }
  // getComponents(){
  //   this.httpClient.get<any>('http://localhost:8000/getComponents/user1_proj5_canvas1').subscribe(
  //     response=>{
  //       this.components=response;
  //       this.components.map(x=>{
  //         let props: IProperty= {
  //           key: '',
  //           id: x.componentID,
  //           value: x.componentValue,
  //           class: x.componentClass,
  //           style: x.componentStyle,
  //           typeObj: x.componentTypeObj,
  //           type: x.componentType,
  //           draggable: x.componentDraggable,
  //           selected : false,
  //           hidden: false,
  //           mouseDragPositionX:x.componentPositionX,
  //           mouseDragPositionY:x.componentPositionY,
  //           finalStyle: ''
  //         }
  //         switch(x.componentTypeObj){
  //           case 'navDrag':
  //             this.updateComponentList(new NavbarDragComponent(this.passCanvas));
  //             console.log(x)
  //             break;
  //           case 'tableDrag':
  //             this.updateComponentList(new TableDragComponent(this.passCanvas, this.changeref));
  //             break;
  //           case 'buttonDrag':
  //             this.updateComponentList(new ButtonDragComponent(this.passCanvas));
  //             break;
  //           case 'linkDrag':
  //             this.updateComponentList(new LinkDragComponent(this.passCanvas));
  //             break;
  //         }
  //       })
  //     }
  //   )
  // }

  updateComponentList(components: IComponent) {
    //this.componentList.push(components);

    let tempCompList: IComponent[] = [];
    if (this.componentListMap.has(this.currentTab)) {
      tempCompList = this.componentListMap.get(this.currentTab)!;
    }
    tempCompList.push(components);
    this.componentListMap.set(this.currentTab, tempCompList);
    console.log(this.componentListMap);
    
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
    //console.log(this.isPlaying);
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
