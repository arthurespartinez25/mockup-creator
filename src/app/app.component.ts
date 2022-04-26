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
import { IComponent} from './interfaces/icomponent';
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
import { UsersService } from './service/users/users.service';

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
  components: any;
  cssArray: any;

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
  
  changeref: ChangeDetectorRef;
  userID: number;
  constructor(
    private loginCookie:CookieService,
    changeDetectorRef: ChangeDetectorRef,
    public _router: Router,
    public _location: Location,
    public sanitizer: DomSanitizer,
    public datepipe: DatePipe,
    private httpClient: HttpClient,
    private service: UsersService,
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
  canvasArray: ElementRef[]
  canvasList: any;
  openedProjectID: any;

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
  }
  ngAfterViewInit(): void {
    this.canvasDirective = this.canvas.passCanvas();    
    this.passCanvas = this.canvasDirective;
  }
  loadComponents(){
    for(let j = 0; j<this.canvasArray.length; j++){
      let canvas = this.canvasArray[j];
      let canvasId = canvas.nativeElement.id;
      let index = 0;
      for(let i=0; i<this.components.length; i++){
        let props: IProperty= {
          key: this.components[i].componentID.replace(/\D/g, ""),
          id: this.components[i].componentID,
          value: this.components[i].componentValue,
          class: this.components[i].componentClass,
          style: this.components[i].componentFinalStyle,
          typeObj: this.components[i].componentTypeObj,
          type: this.components[i].componentType,
          draggable: this.components[i].componentDraggable === "true",
          selected : false,
          hidden: false,
          mouseDragPositionX:Number(this.components[i].componentPositionX),
          mouseDragPositionY:Number(this.components[i].componentPositionY),
          finalStyle: this.components[i].componentFinalStyle,
          href: this.components[i].componentHREF,
          placeholder: this.components[i].componentPlaceholder,
          tblCols: Number(this.components[i].componentColumns),
          tblArrayRow: Number(this.components[i].componentRows),
          isIcon: this.components[i].componentIsIcon === "true",
          iconValue: this.components[i].componentIconValue,
          iconLabel1: this.components[i].componentIconLabel1,
          iconLabel2: this.components[i].componentIconLabel2,
          target: this.components[i].componentTarget === "true",
          redirection: this.components[i].componentRedirection,
          isSavedComponent: true,
          name: this.components[i].componentName,
          checked: this.components[i].componentChecked,
          url: this.sanitizer.bypassSecurityTrustResourceUrl(this.components[i].componentValue),
          linkValue: this.components[i].componentOptionValues,
          linksArray: this.components[i].componentOptionValues.split(','),
          cols: this.components[i].componentTextboxCols,
          rows: this.components[i].componentTextboxRows
        }
        if(canvasId == this.components[i].tabs_id){
          switch(props.typeObj){
            case 'buttonDrag':
              this.updateComponentList(new ButtonDragComponent(canvas), canvas);
              break;
            case 'labelDrag':
              this.updateComponentList(new LabelDragComponent(canvas), canvas);
              break;
            case 'checkboxDrag':
              this.updateComponentList(new CheckboxDragComponent(canvas), canvas);
              break;
            case 'dropdownDrag':
              this.updateComponentList(new DropdownDragComponent(canvas), canvas);
              break;
            case 'imgDrag':
              this.updateComponentList(new ImageDragComponent(canvas), canvas);
              break;
            case 'divDrag':
              this.updateComponentList(new DivDragComponent(canvas), canvas);
              break;
            case 'radioDrag':
              this.updateComponentList(new RadioDragComponent(canvas), canvas);
              break;
            case 'textboxDrag':
              this.updateComponentList(new TextboxDragComponent(canvas), canvas);
              break;
            case 'paragraphDrag':
              this.updateComponentList(new ParagraphDragComponent(canvas), canvas);
              break;
            case 'navDrag':
              this.updateComponentList(new NavbarDragComponent(canvas), canvas);
              break;
            case 'datepickerDrag':
              this.updateComponentList(new DatepickerDragComponent(canvas, this.datepipe), canvas);
              break;
            case 'headerDrag':
              this.updateComponentList(new HeaderDragComponent(canvas), canvas);
              break;
            case 'inputDrag':
              this.updateComponentList(new InputDragComponent(canvas), canvas);
              break;
            case 'linkDrag':
              this.updateComponentList(new LinkDragComponent(canvas), canvas);
              break;
            case 'tableDrag':
              this.updateComponentList(new TableDragComponent(canvas, this.changeref), canvas);
              break;
            case 'youtubeDrag':
              this.updateComponentList(new YoutubeDragComponent(canvas, this.sanitizer), canvas);
              break;
            case 'videoDrag':
              this.updateComponentList(new VideoDragComponent(canvas, this.sanitizer), canvas);
              break;
          }
          Object.keys(this.componentListMap.get(canvasId)![index].props).forEach(key=>{
            this.componentListMap.get(canvasId)![index].props[key]=props[key]
          });
          index++;
        }
      }
    }  
    this.currentTab = this.canvasArray[this.canvasArray.length -1].nativeElement.id;
  }

  updateComponentList(components: IComponent, canvas?: any) {
    //this.componentList.push(components);
    let tempCompList: IComponent[] = [];
    if(canvas){
      let id = canvas.nativeElement.id;
      if(this.componentListMap.has(id)){
        tempCompList = this.componentListMap.get(id)!;
      } 
      tempCompList.push(components);
      this.componentListMap.set(id, tempCompList);
      this.componentList = this.componentListMap.get(id)!;
    } else {
      if (this.componentListMap.has(this.currentTab)) {
        tempCompList = this.componentListMap.get(this.currentTab)!;
      }
      tempCompList.push(components);
      this.componentListMap.set(this.currentTab, tempCompList);
      this.componentList = this.componentListMap.get(this.currentTab)!;
    }
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

  updateCanvasArray(value: any){
    this.canvasArray=value;
  }

  updateProjectId(value:any){
    this.openedProjectID = value;
    this.componentListMap.clear();
    this.cssArray = [];

    this.service.getCanvas(value).subscribe((res)=>{
      this.canvasList = res;
      this.canvas.updateSavedCanvas(this.canvasList)
    })

    this.service.getComponents(value).subscribe((res)=>{
      this.components=res;
      this.loadComponents()
    })

    this.service.getCss(value).subscribe((res)=>{
      this.cssArray = res;
      let css = ""
      for(let i = 0; i<this.cssArray.length; i++){
        css += this.cssArray[i].css_name + "{\n" + this.cssArray[i].properties + "}\n"
      }
      css=css.split(";").join(";\n")
      this.code.getCss(css)
    })
    
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
