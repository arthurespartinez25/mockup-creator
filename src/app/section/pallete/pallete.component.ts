import { AppComponent } from './../../app.component';
import {
  CdkDrag,
  CdkDragEnd,
  DragDrop,
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
  AfterViewChecked,
  AfterViewInit,
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IComponent } from './../../interfaces/icomponent';
import { IProperty } from './../../interfaces/iproperty';
import { ButtonDragComponent } from './../../components/buttonDrag/buttonDrag.component';
import { LabelDragComponent } from './../../components/labelDrag/labelDrag.component';
import { CheckboxDragComponent } from './../../components/checkboxDrag/checkboxDrag.component';
import { DropdownDragComponent } from './../../components/dropdownDrag/dropdownDrag.component';
import { ImageDragComponent } from './../../components/imageDrag/imageDrag.component';
import { DivDragComponent } from './../../components/divDrag/divDrag.component';
import { RadioDragComponent } from './../../components/radioDrag/radioDrag.component';
import { TextboxDragComponent } from './../../components/textboxDrag/textboxDrag.component';
import { PopupDragComponent } from './../../components/popupDrag/popupDrag.component';
import { FormArray } from '@angular/forms';
import { ParagraphDragComponent } from './../../components/paragraphDrag/paragraphDrag.component';
import { NavbarDragComponent } from './../../components/navbarDrag/navbarDrag.component';
import { ModalDragComponent } from './../../components/modalDrag/modalDrag.component';
import { DatepickerDragComponent } from './../../components/datepickerDrag/datepickerDrag.component';
import { HeaderDragComponent } from './../../components/headerDrag/headerDrag.component';
import { InputDragComponent } from './../../components/inputDrag/inputDrag.component';
import { LinkDragComponent } from './../../components/linkDrag/linkDrag.component';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { TableDragComponent } from './../../components/tableDrag/tableDrag.component';
import { YoutubeDragComponent } from './../../components/youtubeDrag/youtubeDrag.component';
import { AppLoginComponent } from './../../app-login/app-login.component';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from './../../service/users.service';
import { DatePipe } from '@angular/common'
import { PropertyComponent } from './../../property/property.component';
import { emit } from 'process';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-pallete',
  templateUrl: './pallete.component.html',
  styleUrls: ['./pallete.component.css']
})
export class PalleteComponent implements OnInit, AfterViewInit, AfterViewChecked {
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
  };

  public cssRuleCount = document.styleSheets[0].cssRules.length;
  public _popupCount = 0;
  private _styleStart = '<style>';
  private _styleEnd = '</style>';
  private _styleBody = '';
  private _styleBody1 =
    '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">';
  private _styleBody2 =
    '<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>';
  private _styleBody3 =
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>';
  private _styleBody4 =
    '<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>';
  private _htmlStart = '<!doctype html>\n<html lang="en">\n<meta charset="utf-8">';
  private _htmlEnd = '</html>';
  private _bootstrapLink =
    '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet">';
  private _bootstrapScript =
    '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></script>';
  private _popupFunction =
    '<script>\nvar popoverTriggerList = [].slice.call(document.querySelectorAll(\'[data-bs-toggle="popover"]\'))\nvar popoverList = popoverTriggerList.map(function (popoverTriggerEl) {\nreturn new bootstrap.Popover(popoverTriggerEl)\n})\n</script>';

  @ViewChild('PropertyComponent') property: boolean;
  @Input() canvas: ElementRef;
  @Input() propertyCmp: PropertyComponent;
  @Input() domInsideCanvas: boolean;
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
    private renderer: Renderer2,
    private drag: DragDrop,
    changeDetectorRef: ChangeDetectorRef,
    private http: HttpClient,
    public _router: Router,
    public _location: Location,
    public sanitizer: DomSanitizer,
    private user:UsersService,
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
    this.dialogService.openConfirmDialog('Log out?')
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

  //----------------------------------------------------------------------------

  get dragDisabled(): boolean {
    return this.dragDisabled;
  }

  get style(): string {
    return this._styleBody;
  }

  set style(value: string) {
    this._styleBody = value;
  }

  styleHandler(event: any) {
    this._styleBody = event.target.value;
  }

  private htmlBody(): string {
    let tmpHtmlBody = '\n';

    this.componentList.forEach((value) => {
      let regexPosition = /sticky/;

      tmpHtmlBody = tmpHtmlBody + value.htmlCode + '\n';
      tmpHtmlBody = tmpHtmlBody.replace(regexPosition, 'absolute');
    });
    return tmpHtmlBody;
  }

  get htmlCode(): string {
    let bootstrap = '';
    let script = '';
    if (this._popupCount > 0) {
      bootstrap += this._bootstrapLink + '\n' + this._bootstrapScript + '\n';
      script += this._popupFunction + '\n';
    }

    return (
      this._htmlStart +
      '\n' +
      this._styleBody1 +
      '\n' +
      this._styleBody2 +
      '\n' +
      this._styleBody3 +
      '\n' +
      this._styleBody4 +
      '\n' +
      bootstrap +
      this.htmlBody() +
      '\n' +
      this._htmlEnd +
      '\n' +
      script +
      this._styleStart +
      '\n' +
      this.style +
      
      '@media (min-width: 901px) and  (max-width: 1000px) { html { zoom: 82%; } }'+
      '@media (min-width: 1001px) and  (max-width: 1150px) { html { zoom: 87%; } }'+
      '@media (min-width: 1151px) and  (max-width: 1300px) { html { zoom: 95%; } }'+
      '@media (min-width: 1301px) and  (max-width: 1500px) { html { zoom: 95%; } }'+
      '@media (min-width: 1501px) and  (max-width: 1900px) { html { zoom: 135%; } }'+
      '@media (min-width: 1919px) and (max-width: 2000px) { html { zoom: 150%; } }'+
      '\n' +
      this._styleEnd
    );
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