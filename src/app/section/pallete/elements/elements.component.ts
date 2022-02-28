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
import { IComponent } from './../../../interfaces/icomponent';
import { IProperty } from './../../../interfaces/iproperty';
import { ButtonDragComponent } from './../../../components/buttonDrag/buttonDrag.component';
import { LabelDragComponent } from './../../../components/labelDrag/labelDrag.component';
import { CheckboxDragComponent } from './../../../components/checkboxDrag/checkboxDrag.component';
import { DropdownDragComponent } from './../../../components/dropdownDrag/dropdownDrag.component';
import { ImageDragComponent } from './../../../components/imageDrag/imageDrag.component';
import { RadioDragComponent } from './../../../components/radioDrag/radioDrag.component';
import { TextboxDragComponent } from './../../../components/textboxDrag/textboxDrag.component';
import { PopupDragComponent } from './../../../components/popupDrag/popupDrag.component';
import { FormArray } from '@angular/forms';
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
import { AppLoginComponent } from './../../../app-login/app-login.component';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from './../../../service/users.service';
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
  logout() {
    this.loginCookie.deleteAll();
    this._router.navigate(['/']);
    setTimeout(() => {
      window.location.reload();
    }, 100);
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

      default:
        temp = new ButtonDragComponent(this.canvas);
    }
    this.canvasLeft = (this.canvas.nativeElement as HTMLElement).offsetLeft;
    this.canvasTop = (this.canvas.nativeElement as HTMLElement).offsetTop;
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
      console.log(this.canvasLeftX);
      console.log(this.canvasTopY);
      if (
        component == 'img' ||
        component == 'nav' ||
        component == 'link' ||
        component == 'table' ||
        component == 'youtube'
      ) {
        this.canvasLeftX = 0;
        this.canvasTopY = 0;
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
    this.addComponent(component);
    this.updateMousePosX.emit(this.mousePositionX);
    this.updateMousePosY.emit(this.mousePositionY);
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

  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  downloadCode(val: string) {
    let file = new Blob([val], { type: '.html' });
    let a = document.createElement('a'),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
  buildCode(val: string) {
    let file = new Blob([val], { type: 'text/html' });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, 'index.html');
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

  refresh(): void {
    this._router
      .navigateByUrl('/refresh', { skipLocationChange: true })
      .then(() => {
        this._router.navigate([decodeURI(this._location.path())]);
      });
  }

  cssString() {
    console.log(this._styleStart + '\n' + this.style + '\n' + this._styleEnd);
    return this._styleStart + '\n' + this.style + '\n' + this._styleEnd;
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

  /*************Here Starts CSS Code******************/

  /*
  cssReceiveMessage()
    gets the cssRules from stylesheets and adds it to this.style.

  addAllCSSRule()
    gets the string from the CSS input field and processes it on a suitable format.
    deletes/clears previously created cssRule by using deleteCSSRule function 
    and adds the new processed string one by one by the use of addCSSRule function

  addCSSRule()
    adds a cssRule to the web-app document.styleSheet
  
  deleteCSSRule()
    deletes cssRules with the same index as the given parameter
  
  */


  cssReceiveMessage() {
    this.style = '';
    console.log(document.styleSheets.item(0));
    let newCssRuleCount = document.styleSheets[0].cssRules.length; //gets the total CSSRule inside the stylesheet
    let cssString: string;

    for (let i = this.cssRuleCount; i < newCssRuleCount; i++) { //compares web-app default cssRule count with the added cssRules
      cssString = document.styleSheets[0].cssRules[i].cssText.toString();  
      if (
        document.styleSheets[0].cssRules[i].cssText
          .toString()
          .substring(0, 11) == '#canvasBody' //compares existing cssRules string if the selector is equals to "#canvasBody"
      ) {
        if (
          document.styleSheets[0].cssRules[i].cssText
            .toString()
            .substring(11, 13) == ' {' //executes the code below if string has no other selector after "#canvasBody"
        ) {
            this.style += 'body' + cssString.substring(11, cssString.length); //adds body selector to style
            this.style += '\n';
          } else {
            this.style += cssString.substring(11, cssString.length);
            this.style += '\n';
          }
      } 
      else {
        this.style += document.styleSheets[0].cssRules[i].cssText.toString(); //adds regular selector to style
        this.style += '\n';
      }
    }
  }

  addAllCSSRule(allCSSRule: any) {
    let allCSSRuleCount = 0;
    let stringIndex = 0;
    let startingIndex = 0;
    let curlyBraces = 0;
    let cssString = '';
    let newCSSRule = '';
    let newCSSRuleCount = document.styleSheets[0].cssRules.length;

    while (document.styleSheets[0].cssRules.length != this.cssRuleCount) {
      let numberOfRules =
      document.styleSheets[0].cssRules.length - this.cssRuleCount;
      //you can uncomment code below if you want to log and test the data
      /* 
      console.log('this is the start of RuleCount: ' + this.cssRuleCount);
      console.log(
        'this is the current RuleCount: ' +
          (document.styleSheets[0].cssRules.length - 1)
      );
      console.log('this is the new RuleCount: ' + numberOfRules);
      */
      document.styleSheets.item(0)?.deleteRule(document.styleSheets[0].cssRules.length - 1); // deletes all the added CSS Rules
    }

    for (let i = 0; i < allCSSRule.length; i++) {
      if (allCSSRule[i] != ' ' && allCSSRule[i] != '\n') { //checks if there are whitespaces
        newCSSRule += allCSSRule[i]; // adds each character that is not a whitespace
      } else {
        //console.log('White space detected at: ' + i); 
        continue; //ignores white spaces
      }
    }
    //console.log(newCSSRule.toString());

    while (stringIndex < newCSSRule.length - 1) {
      for (let i = stringIndex; i <= newCSSRule.length - 1; i++) { // adds the body of the string after the selector
        if (newCSSRule[i] == '{') { 
          //checks if a { exists inside the cssRule body so it will not immediately terminate if the loop encountered a }
          curlyBraces++; //adds 1 to number of { existing inside the body
        }
        if (newCSSRule[i] == '}' && curlyBraces >= 2) { //checks if there are existing { then substracts 1 from curlyBraces
          curlyBraces--;
        } else if (newCSSRule[i] == '}' && curlyBraces == 1) { 
          //if there are only one existing '{' and '}' is encountered the string is added as a cssRule using addCSSRule
          curlyBraces--;
          cssString = '';
          cssString = newCSSRule.substring(startingIndex, i + 1).toString();
          this.addCSSRule(cssString.toString());
          //passes the string as a parameter then adds a value to total CSS Rule count 
          stringIndex = 1 + i;
          startingIndex = 1 + i;
          allCSSRuleCount++;
          break;
        }
      }
    }
  }

  addCSSRule(cssString: string) {
    let newCssRuleCount = document.styleSheets[0].cssRules.length;
    let cssStringTemp;
    let cssRuleStringTemp: string;
    let cssCanvasSelector = cssString.substring(0, cssString.indexOf('{'));
    let cssRuleStringClassID = cssString.substring(0, cssString.indexOf('{'));
    let ruleFound = 0;
    let ruleNumber;
    let generalRule = false;

    if (cssString[0] == '.') { 
      //checks if the string is a class
      console.log(cssRuleStringClassID + ' is a Class selector');
    } else if (cssString[0] == '#') {  
      //checks if the string is a ID
      console.log(cssRuleStringClassID + ' is an ID selector');
    } else if (cssString[0] != '#' && cssString[0] != '.') {
      generalRule = true;
      //checks if the string is a general selector
      console.log('"' + cssCanvasSelector + '" is a general Selector;');
    }

    if (generalRule == true) {
      switch (cssString.substring(0, cssString.indexOf('{'))) {
        case 'body': {
          cssStringTemp =
            '#canvasBody ' +
            cssString.substring(cssString.indexOf('{')).toString();  //adds the cssRule as #canvasBody instead of body selector
          break;
        }
        default: {
          cssStringTemp =
            '#canvasBody ' +
            cssCanvasSelector +
            cssString.substring(cssString.indexOf('{')).toString();  //adds the cssRule as #canvasBody plus the added selector
          break;
        }
      }
    } else {
      for (let i = this.cssRuleCount; i < newCssRuleCount; i++) {
        cssRuleStringTemp =
          document.styleSheets[0].cssRules[i].cssText.toString();
        if (
          cssRuleStringTemp.substring(0, cssString.indexOf('{')) ===
          cssRuleStringClassID.toString()
        ) {
          //console.log('Class found!');
          ruleFound = 1;
          ruleNumber = i;
        } else if (
          cssRuleStringTemp.substring(0, cssString.indexOf('{')) ===
          cssRuleStringClassID.toString()
        ) {
          //console.log('ID found!');
          ruleFound = 1;
          ruleNumber = i;
        }
      }
    }

    //checks if the css rule already exists
    if (ruleFound == 1 && generalRule == false) { //if selector exists deletes it and adds a new one
      //console.log('this is the ruleNumber: ' + ruleNumber);
      document.styleSheets
        .item(0)
        ?.insertRule(
          '\n' + cssString + '\n',
          document.styleSheets[0].cssRules.length
        ); //adds the cssRules
      document.styleSheets.item(0)?.deleteRule(ruleNumber); //deletes existing rule with the same selector
      ruleFound = 0;
    } else if (ruleFound == 0 && generalRule == false) { //if selector does exists and is not a general css selector 
      document.styleSheets
        .item(0)
        ?.insertRule(
          '\n' + cssString + '\n',
          document.styleSheets[0].cssRules.length
        ); //adds the cssRules
    } else if (ruleFound == 0 && generalRule == true) { //if selector does exists and is a general css selector
      document.styleSheets
        .item(0)
        ?.insertRule(
          '\n ' + cssStringTemp + '\n',
          document.styleSheets[0].cssRules.length
        ); //adds the cssRules
    }

    //console.log('this is the starting number: ' + this.cssRuleCount);
    //console.log(document.styleSheets.item(0));
  }

  //the comment below are for deleting a cssRule by one
  
  deleteCSSRule(cssString: string) { //deletes the CSS rule
    let newCssRuleCount = document.styleSheets[0].cssRules.length;
    let cssRuleStringTemp: string;
    let cssRuleStringClassID = cssString.substring(0, cssString.indexOf('{'));
    let ruleFound = 0;
    let ruleNumber;
    for (let i = this.cssRuleCount; i < newCssRuleCount; i++) {
      cssRuleStringTemp =
        document.styleSheets[0].cssRules[i].cssText.toString();
      if (
        cssRuleStringTemp.includes(cssRuleStringClassID) ||
        cssRuleStringTemp
          .substring(0, cssString.indexOf('{'))
          .includes('#canvasBody ' + cssRuleStringClassID) ||
        cssRuleStringClassID == '#canvasBody '
      ) {
        console.log('rule found!');
        ruleFound = 1;
        ruleNumber = i;
      }
    }
    if (ruleFound == 1) {
      document.styleSheets.item(0)?.deleteRule(ruleNumber);
      console.log('Rule ' + ruleNumber + ' deleted');
    } else if (ruleFound == 0) {
      console.log("Rule doesn't exist");
    }
  }
  @ViewChild('cssTextArea') styleBox: ElementRef;
  clearCss() {
    this.styleBox.nativeElement.value = '';
  } 
  

  /*************Here Ends CSS Code******************/

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

