import { ElementsComponent } from './elements/elements.component';
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
import { IComponent } from './../../interfaces/icomponent';
import { IProperty } from './../../interfaces/iproperty';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common'
import { PropertyComponent } from './../../property/property.component';
import { DialogService } from 'src/app/service/dialog/dialog.service';
import { environment } from 'src/environments/environment';
import { TemplatesComponent } from './templates/templates.component';
import { ComponentListComponent } from './component-list/component-list.component';
import { SaveComponent, SaveDataComponent } from './save/save.component';

@Component({
  selector: 'app-pallete',
  templateUrl: './pallete.component.html',
  styleUrls: ['./pallete.component.css']
})
export class PalleteComponent implements OnInit, AfterViewInit, AfterViewChecked {
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
    finalStyle:''
  };

  public cssRuleCount = document.styleSheets[0].cssRules.length;
  public _popupCount = 0;
  @ViewChild('PropertyComponent') property: boolean;
  @ViewChild(ElementsComponent) element: ElementsComponent;
  @ViewChild(TemplatesComponent) template: TemplatesComponent;
  @ViewChild(ComponentListComponent) compList: ComponentListComponent;
  @ViewChild(SaveComponent) save: SaveComponent;
  @Input() canvas: ElementRef;
  @Input() propertyCmp: PropertyComponent;
  @Input() domInsideCanvas: boolean;
  @Input() componentList: IComponent[] = [];
  @Input() componentListMap: Map<string, IComponent[]>;
  @Input() style: string;
  @Input() tabList: any;
  @Input() currentTab: string;
  @Input() isPlaying: boolean;
  @Input() selectedLanguage: any;
  //@Input() componentListMap:
  //@ViewChild('textOp') textBtn!: ElementRef;
  @ViewChild('subMenuItem') subMenuItem!: ElementRef;
  @ViewChild('subMenuItem2') subMenuItem2!: ElementRef;
  //@ViewChild(PropertyComponent) propertyCmp:PropertyComponent;
  @Output() updateSelectedEvent = new EventEmitter<IProperty>();
  

  @Output() updateComponentListEvent = new EventEmitter<IComponent>();
  @Output() updateCanvasLeftEvent = new EventEmitter<number>();
  @Output() updateCanvasTopEvent = new EventEmitter<number>();
  @Output() updateCanvasWEvent = new EventEmitter<number>();
  @Output() updateMousePosX = new EventEmitter<number>();
  @Output() updateMousePosY = new EventEmitter<number>();
  @Output() updateWhatComponentEvent = new EventEmitter<string>();
  @Output() updateProjectNameEvent = new EventEmitter<string>();
  changeref: ChangeDetectorRef;
  constructor(
    private loginCookie:CookieService,
    changeDetectorRef: ChangeDetectorRef,
    public _router: Router,
    public _location: Location,
    public sanitizer: DomSanitizer,
    public datepipe: DatePipe,
    private dialogService: DialogService,
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

  logout() {
    this.loginCookie.deleteAll();
    this._router.navigate(['/']);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  confirmLogOut() {
    this.dialogService.openConfirmDialog(this.selectedLanguage.confirmDialog.logOut)
    .afterClosed().subscribe(res =>{
      if(res){
        this.logout();
      }
    });
  }

  clearComponentList() {
    this.componentList.length = 0;
  }

  updateComponentListDel(value : IComponent[]) {
    this.componentList = value;
  }

  returnComponentList() {
    return this.componentList;
  }

  updatedList(components: IComponent){
    this.updateComponentListEvent.emit(components)
  }
  updatedCanvasLeft(value: number){
    this.updateCanvasLeftEvent.emit(value)
  }
  updatedCanvasTop(value: number){
    this.updateCanvasTopEvent.emit(value)
  }
  updatedCanvasW(value : number){
    this.updateCanvasWEvent.emit(value)
  }
  updatedMousePositionX(value: number){
    this.updateMousePosX.emit(value)
  }
  updatedMousePositionY(value: number){
    this.updateMousePosY.emit(value)
  }
  updatedWhatComponent(value: string){
    this.updateWhatComponentEvent.emit(value)
  }
  updateProjectName(value: string) {
    this.updateProjectNameEvent.emit(value);
  }

  updateSelected(value: IProperty){
    this.updateSelectedEvent.emit(value)
  }

  updateSelectedLanguage(value: any){
    this.selectedLanguage = value;
    this.element.updateSelectedLanguage(value);
    this.template.updateSelectedLanguage(value);
    this.compList.updateSelectedLanguage(value);
    this.save.updateSelectedLanguage(value);
    
    console.log(this.selectedLanguage);
  }
  //----------------------------------------------------------------------------

  get dragDisabled(): boolean {
    return this.dragDisabled;
  }

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

  //code below is for counting how many component of the same type are in the componentList
  addToNoOfComponent(value: IComponent) {
    let componentIndex = this.componentList.indexOf(value);
    let checkbox,
      datepicker,
      dropdown,
      header,
      image,
      div,
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