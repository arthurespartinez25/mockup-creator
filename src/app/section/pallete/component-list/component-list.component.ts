import {
  CdkDragDrop,
  moveItemInArray,
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
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IComponent } from './../../../interfaces/icomponent';
import { IProperty } from './../../../interfaces/iproperty';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common'
import { PropertyComponent } from './../../../property/property.component';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.css']
})
export class ComponentListComponent implements OnInit, AfterViewInit, AfterViewChecked {
  title = 'mockup-creator';
  index: number;
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
  };

  public cssRuleCount = document.styleSheets[0].cssRules.length;
  public _popupCount = 0;

  @ViewChild('PropertyComponent') property: boolean;
  @Input() canvas: ElementRef;
  @Input() propertyCmp: PropertyComponent;
  @Input() componentList: IComponent[] = [];
  //@ViewChild('textOp') textBtn!: ElementRef;
  @ViewChild('subMenuItem') subMenuItem!: ElementRef;
  @ViewChild('subMenuItem2') subMenuItem2!: ElementRef;
  //@ViewChild(PropertyComponent) propertyCmp:PropertyComponent;

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

  clearComponentList() {
    this.componentList.length = 0;
  }

  returnComponentList() {
    return this.componentList;
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
    this.selected = component.props;
    this.selectedComponent = component;
    this.selectedComp(this.selectedComponent);
    if (this.selected.typeObj != 'nav' || 'navDrag') {
      this.styleHolder = this.selected.style;
      let regexLeft = /left(.+?);/;
      let regexTop = /top(.+?);/;
      let regexPosition = /position(.+?);/;
      this.styleHolder = this.styleHolder.replace(regexLeft, '');
      this.styleHolder = this.styleHolder.replace(regexTop, '');
      this.styleHolder = this.styleHolder.replace(regexPosition, '');
      this.selected.style =
        this.styleHolder +
        'position:sticky;' +
        'left:' +
        this.selected.mouseDragPositionX +
        '%;' +
        'top:' +
        this.selected.mouseDragPositionY +
        '%;';
      //  this.selected.mouseDragPositionX = 0;
      //  this.selected.mouseDragPositionY = 0;
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
  }
  onDragEnd(component: IComponent) {
    console.log(component);
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

  /*************The code below is for component list functions**********************/

  deleteComponent(value: any) {
    let componentIndex = this.componentList.indexOf(value); //gets the index of the selected component inside the canvas
    if (componentIndex !== -1) {
      this.componentList.splice(componentIndex, 1); //removes the component from the canvas
    }
  }

  hideComponent(value: any) {
    let componentIndex = this.componentList.indexOf(value); //gets the index of the selected component inside the canvas
    this.componentList[componentIndex].props.hidden =
      !this.componentList[componentIndex].props.hidden; //removes visibility of a component from the canvas 
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.componentList,
      event.previousIndex,
      event.currentIndex
    );
    //console.log("This is the previous index " + event.previousContainer);
    //console.log("This is the new index " + event.currentIndex);
  }

  //code below is for counting how many component of the same type are in the componentList
  addToNoOfComponent(value: IComponent) {
    let componentIndex = this.componentList.indexOf(value);
    let checkbox,
      datepicker,
      dropdown,
      header,
      image,
      input,
      label,
      link,
      modal,
      navbar,
      paragraph,
      radio,
      table,
      textbox,
      youtube = 0; // create a variable for each type of component
    switch (this.componentList[componentIndex].props.typeObj) {
      case 'buttonDrag': {
        this.noOfButton++;
        this.numberOfComponents.push([value], ['Button' + this.noOfButton]);
      }
    }
  }

  /**************End of code for component list functions *************************/


  /****************** OLD CODE STARTS HERE **********************/
}
function readCSSFile(arg0: string) {
  throw new Error('Function not implemented.');
}

