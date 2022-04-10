import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ComponentRef, ElementRef, Input, OnInit, Output, Renderer2, ViewChild, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { IComponent } from './../../interfaces/icomponent';
import { IProperty } from './../../interfaces/iproperty';
import { PropertyComponent } from './../../property/property.component';
import { ButtonService } from 'src/app/button-service.service';
import { keyframes } from '@angular/animations';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, AfterViewInit, AfterViewChecked {
  props: IProperty;
  editable: boolean;
  tabs = [{id: 'canvas1',
          name: "Canvas 1",
          allowEdit: false }];
  selectedTab = 0;
  currentTab = 0;
  totalTabs = 0;
  index: number;
  numberOfComponents: any = [];
  selectedComponent: IComponent;
  ref: ComponentRef<any>;
  readonly CSS_URL = '../app/app.component.css';
  refreshCSS = new BehaviorSubject<boolean>(true);
  cssDocument?: StyleSheet;
  users: any;
  canvasIndex: number;
  initialName = "Canvas 1";

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

  defaultProps: IProperty = {
    key: '',
    id: '',
    value: '',
    class: '',
    style: '',
    typeObj: '',
    type: '',
    draggable: true,
    selected: false,
    mouseDragPositionX:0,
    mouseDragPositionY:0,
    dummyDate:'',
    finalStyle:''
  }

  public cssRuleCount = document.styleSheets[0].cssRules.length;
  public _popupCount = 0;

  @ViewChild('PropertyComponent') property: boolean;
  @ViewChildren('canvas') canvasListElements: QueryList<ElementRef>;
  @ViewChild('canvas') canvas!: ElementRef;
  //@ViewChild('textOp') textBtn!: ElementRef;
  @ViewChild('subMenuItem') subMenuItem!: ElementRef;
  @ViewChild('subMenuItem2') subMenuItem2!: ElementRef;
  @ViewChild(PropertyComponent) propertyCmp:PropertyComponent;

  @Output() updateSelectedEvent = new EventEmitter<IProperty>();
  @Output() updateSelectedComponentEvent = new EventEmitter<IComponent>();
  @Output() updateDomInsideCanvasEvent = new EventEmitter<boolean>();
  @Output() selectedTabChange: EventEmitter<MatTabChangeEvent>;
  @Output() updateSelectedTabEvent = new EventEmitter<string>();
  @Output() updateComponentListMapEvent = new EventEmitter<Map<string, IComponent[]>>();
  @Output() updateSelectedCanvasEvent = new EventEmitter<ElementRef>();
  @Output() updateTabListEvent = new EventEmitter<any>();
  @Output() updateIsPlaying = new EventEmitter<boolean>();

  @Input() componentList : IComponent[] = [];
  @Input() mousePositionX: any;
  @Input() mousePositionY: any;
  @Input() canvasLeft: any;
  @Input() canvasTop: any;
  @Input() canvasW: any;
  @Input() whatComponent:any;
  @Input() componentListMap : Map<string, IComponent[]>;
  
 

  changeref: ChangeDetectorRef;
  // props: any;
  constructor(
    private loginCookie:CookieService,
    changeDetectorRef: ChangeDetectorRef,
    public _router: Router,
    public _location: Location,
    public sanitizer: DomSanitizer,
    public datepipe: DatePipe,
    private buttonService?: ButtonService
  ) {
    this.changeref = changeDetectorRef;
    if(buttonService) {
      this.buttonService?.listen().subscribe((m:string) => {
        this.canvasIndex = this.tabs.findIndex(x => x.name == m);
        this.changeIndex(this.canvasIndex);
      })
    }
  }
  delete: boolean;
  cssBody: SafeStyle;
  canvasBG: string;
  sessionID = this.loginCookie.get("sessionID");
  inSession: boolean = this.sessionID == "12345";
  isPlaying: boolean = false;
  
  

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
    
  }
  ngAfterViewInit(): void {
    this.canvasListElements.toArray();
    this.updateTabListEvent.emit(this.tabs);
  }

  canvasLeftX = 0;
  canvasTopY = 0;
  domInsideCanvas: boolean;
  offsetLeft: any = 0;
  offsetTop:any  = 0;
  xDis: any = 0;
  yDis: any = 0;
  noOfButton: number = 0;
  xDistance: any = 0;
  yDistance: any = 0;
  theUsername = "";

  passCanvas() {
    return this.canvas;
    
  }
  updateDomInsideCanvas(value: boolean){
    this.domInsideCanvas = value;
    this.updateDomInsideCanvasEvent.emit(this.domInsideCanvas)
  }

  //----------------------------------------------------------------------------

  ngAfterViewChecked() {
    this.changeref.detectChanges();
  }
  styleHolder = 'aw';
  isDisabled = true;
  timerDisable() {
    setTimeout(() => {
      this.isDisabled = true;
    }, 100);
  }
  clickHandler(component: IComponent) {
    console.log(component);
    this.selected = component.props;
    this.selectedComponent = component;
    this.updateSelectedComponentEvent.emit(this.selectedComponent);
    this.selectedComp(this.selectedComponent);
    if (this.selected.typeObj != 'nav' || 'navDrag') {
      // this.styleHolder = this.selected.style;
      // let regexLeft = /left(.+?);/;
      // let regexTop = /top(.+?);/;
      // let regexPosition = /position(.+?);/;
      // this.styleHolder = this.styleHolder.replace(regexLeft, '');
      // this.styleHolder = this.styleHolder.replace(regexTop, '');
      // this.styleHolder = this.styleHolder.replace(regexPosition, '');
      // this.selected.style =
      //   this.styleHolder +
      //   'position:absolute;' +
      //   'left:' +
      //   this.selected.mouseDragPositionX +
      //   '%;' +
      //   'top:' +
      //   this.selected.mouseDragPositionY +
      //   '%;';
    } else if (
      this.selected.mouseDragPositionY != 0 &&
      (this.selected.typeObj == 'nav' || 'navDrag')
    ) {
      this.styleHolder = this.selected.style;
      let regexLeft = /left(.+?);/;
      let regexTop = /top(.+?);/;
      let regexPosition = /position(.+?);/;
      this.styleHolder = this.styleHolder.replace(regexLeft, '');
      this.styleHolder = this.styleHolder.replace(regexTop, '');
      this.styleHolder = this.styleHolder.replace(regexPosition, '');
      this.selected.style = this.selected.style;
      this.selected.style =
        this.styleHolder +
        'position:sticky;' +
        'left:' +
        this.selected.mouseDragPositionX +
        'px;' +
        'top:' +
        this.selected.mouseDragPositionY +
        '%;';
      this.selected.mouseDragPositionX = 0;
      this.selected.mouseDragPositionY = 0;
    }
    this.updateSelectedEvent.emit(this.selected);
    console.log(this.canvas);
  }
  onDragEnd(component: IComponent) {
    console.log(component);
  }

  onDblClick($event) {
    let prevName = this.tabs[this.currentTab].name;
    this.tabs[this.currentTab].allowEdit = !this.tabs[this.currentTab].allowEdit;
    this.tabs[this.currentTab].name = $event.srcElement.innerHTML.trim() == '' ? prevName : $event.srcElement.innerHTML.trim();
    console.log(this.tabs);
    this.initialName = (this.tabs[this.currentTab].name);
  }

  selectedComp(value: any) {
    let componentIndex = this.componentList.indexOf(value);
    if (componentIndex !== -1) {
      for (let i = 0; i < this.componentList.length; i++) {
        this.componentList[i].props.selected = false;
      }
      this.componentList[componentIndex].props.selected = true;
    } else {
      console.log('Nothing to highlight');
    }
  }
  refresh(): void {
    this._router
      .navigateByUrl('/refresh', { skipLocationChange: true })
      .then(() => {
        this._router.navigate([decodeURI(this._location.path())]);
      });
  }

  /* PAGINATION CODE */
  addTab() {
    this.tabs[this.currentTab].allowEdit = false;
    this.totalTabs++;
    let toInsert = {
      id: "canvas" + (this.totalTabs + 1),
      name: "Canvas " + (this.totalTabs + 1),
      allowEdit: false
    };
    this.tabs.push(toInsert);
    this.updateTabListEvent.emit(this.tabs); //also update this when changing of order of tabs is implemented
    this.selectedTab = this.tabs.length - 1;
    this.initialName = toInsert.name;
  }
  
  removeTab(index: number) {
    this.tabs[this.currentTab].allowEdit = false;
    let result = window.confirm("Are you sure you want to remove this tab?");
    if (result) {
      this.componentListMap.delete(this.tabs[index].id);
      this.updateComponentListMapEvent.emit(this.componentListMap); //updates the componentList in app.component
      this.tabs.splice(index, 1);

      /*for (let i = 0; i < this.tabs.length; i++) { //renames tabs
        this.tabs[i].name = "Canvas " + (i + 1);
      }*/

      if (index == this.selectedTab) {
        this.selectedTab = (index - 1) < 0 ? 0 : (index - 1); //changes the selected tab to the previous one
      }
    }
  }

  myTabSelectedTabChange(changeEvent: MatTabChangeEvent) {
    this.tabs[this.currentTab].allowEdit = false;
    this.currentTab = changeEvent.index;
    this.updateSelectedTabEvent.emit(this.tabs[this.currentTab].id);
    this.canvas = this.canvasListElements.toArray()[this.currentTab];
    this.updateSelectedCanvasEvent.emit(this.canvas);
    this.updateSelectedEvent.emit(this.defaultProps);
    this.selectedComponent.props.selected = false;
  } 

 
 isPlay(value: any) {
    this.isPlaying = value;
    this.updateIsPlaying.emit(this.isPlaying);
    this.notDraggable();
 }

 notDraggable() {
  this.componentListMap.forEach(x=>x.map(y=>y.props.draggable=!this.isPlaying));
  }

  changeIndex(number: number) {
    this.selectedTab = number;
    console.log(this.componentListMap.get(this.tabs[number].id));
  }    

  deselect() {
    this.selectedComponent.props.selected = false;
    this.updateSelectedEvent.emit(this.defaultProps);
  }

  /****************** OLD CODE STARTS HERE **********************/
}
function readCSSFile(arg0: string) {
  throw new Error('Function not implemented.');
}
