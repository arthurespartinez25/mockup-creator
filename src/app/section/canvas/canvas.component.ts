import { CdkDragDrop, CdkDragEnd, DragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ComponentRef, ElementRef, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { ButtonDragComponent } from 'src/app/components/buttonDrag/buttonDrag.component';
import { CheckboxDragComponent } from 'src/app/components/checkboxDrag/checkboxDrag.component';
import { DatepickerDragComponent } from 'src/app/components/datepickerDrag/datepickerDrag.component';
import { DropdownDragComponent } from 'src/app/components/dropdownDrag/dropdownDrag.component';
import { HeaderDragComponent } from 'src/app/components/headerDrag/headerDrag.component';
import { ImageDragComponent } from 'src/app/components/imageDrag/imageDrag.component';
import { InputDragComponent } from 'src/app/components/inputDrag/inputDrag.component';
import { LabelDragComponent } from 'src/app/components/labelDrag/labelDrag.component';
import { LinkDragComponent } from 'src/app/components/linkDrag/linkDrag.component';
import { ModalDragComponent } from 'src/app/components/modalDrag/modalDrag.component';
import { NavbarDragComponent } from 'src/app/components/navbarDrag/navbarDrag.component';
import { ParagraphDragComponent } from 'src/app/components/paragraphDrag/paragraphDrag.component';
import { PopupDragComponent } from 'src/app/components/popupDrag/popupDrag.component';
import { RadioDragComponent } from 'src/app/components/radioDrag/radioDrag.component';
import { TableDragComponent } from 'src/app/components/tableDrag/tableDrag.component';
import { TextboxDragComponent } from 'src/app/components/textboxDrag/textboxDrag.component';
import { YoutubeDragComponent } from 'src/app/components/youtubeDrag/youtubeDrag.component';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';
import { PropertyComponent } from 'src/app/property/property.component';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, AfterViewInit, AfterViewChecked {
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
  @ViewChild('canvas') canvas!: ElementRef;
  //@ViewChild('textOp') textBtn!: ElementRef;
  @ViewChild('subMenuItem') subMenuItem!: ElementRef;
  @ViewChild('subMenuItem2') subMenuItem2!: ElementRef;
  @ViewChild(PropertyComponent) propertyCmp:PropertyComponent;

  @Input() componentList : IComponent[] = [];
  @Input() mousePositionX: any;
  @Input() mousePositionY: any;
  @Input() canvasLeft: any;
  @Input() canvasTop: any;
  @Input() canvasW: any;
  @Input() whatComponent:any;

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
  canvasPass = this.canvas;
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

  canvasLeftX = 0;
  canvasTopY = 0;
  domInsideCanvas = false;
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
    console.log(component.props);
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
    this.canvasTop = (this.canvas.nativeElement as HTMLElement).offsetTop;
    this.canvasW = (this.canvas.nativeElement as HTMLElement).offsetWidth;

    this.whatComponent = 'loginHeader';
    temp = new HeaderDragComponent(this.canvas);
    this.mousePositionX = this.canvasLeft + 450;
    this.mousePositionY = this.canvasTop + 140;
    this.componentList.push(temp);
    setTimeout(() => {
      this.whatComponent = 'loginInputUser';
      temp = new InputDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 530;
      this.mousePositionY = this.canvasTop + 200;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'loginLabelUser';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 450;
      this.mousePositionY = this.canvasTop + 200;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'loginInputPass';
      temp = new InputDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 530;
      this.mousePositionY = this.canvasTop + 250;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'loginLabelPass';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 450;
      this.mousePositionY = this.canvasTop + 250;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'LoginCheckbox';
      temp = new CheckboxDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 450;
      this.mousePositionY = this.canvasTop + 300;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'LoginButton';
      temp = new ButtonDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 450;
      this.mousePositionY = this.canvasTop + 350;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = '';
    }, 1);
  }
  addComponentImageLabel() {
    this.propertyCmp.clearComponent();
    let temp: IComponent;
    temp = new ButtonDragComponent(this.canvas);
    this.canvasLeft = (this.canvas.nativeElement as HTMLElement).offsetLeft;
    this.canvasTop = (this.canvas.nativeElement as HTMLElement).offsetTop;
    this.canvasW = (this.canvas.nativeElement as HTMLElement).offsetWidth;

    this.whatComponent = 'sampleImage';
    temp = new ImageDragComponent(this.canvas);
    this.mousePositionX = this.canvasLeft + 450;
    this.mousePositionY = this.canvasTop + 140;
    this.componentList.push(temp);
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
    this.canvasTop = (this.canvas.nativeElement as HTMLElement).offsetTop;
    this.canvasW = (this.canvas.nativeElement as HTMLElement).offsetWidth;

    this.whatComponent = 'HPNav1';
    temp = new NavbarDragComponent(this.canvas);
    this.mousePositionX = this.canvasLeft;
    this.mousePositionY = this.canvasTop + 40;

    this.componentList.push(temp);

    setTimeout(() => {
      this.whatComponent = 'HPNav2';
      temp = new NavbarDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft;
      this.mousePositionY = this.canvasTop;

      this.componentList.push(temp);
    }, 100);

    setTimeout(() => {
      this.whatComponent = 'HPP8';
      temp = new ParagraphDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 1050;
      this.mousePositionY = this.canvasTop;

      this.componentList.push(temp);
    }, 100);

    setTimeout(() => {
      this.whatComponent = 'HPLink7';
      temp = new LinkDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 980;
      this.mousePositionY = this.canvasTop + 60;
      this.componentList.push(temp);
    }, 100);

    setTimeout(() => {
      this.whatComponent = 'HPLink8';
      temp = new LinkDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 1080;
      this.mousePositionY = this.canvasTop + 60;
      this.componentList.push(temp);
    }, 100);

    setTimeout(() => {
      this.whatComponent = 'HPLink9';
      temp = new LinkDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 1210;
      this.mousePositionY = this.canvasTop + 60;
      this.componentList.push(temp);
    }, 100);

    setTimeout(() => {
      this.whatComponent = 'HPLabel1';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 20;
      this.mousePositionY = this.canvasTop + 65;
      this.componentList.push(temp);
    }, 100);

    setTimeout(() => {
      this.whatComponent = 'HPLink1';
      temp = new LinkDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 20;
      this.mousePositionY = this.canvasTop + 100;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPLink2';
      temp = new LinkDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 120;
      this.mousePositionY = this.canvasTop + 100;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPLink3';
      temp = new LinkDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 200;
      this.mousePositionY = this.canvasTop + 100;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPNav3';
      temp = new NavbarDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft;
      this.mousePositionY = this.canvasTop + 140;
      this.componentList.push(temp);
    }, 100);

    setTimeout(() => {
      this.whatComponent = 'HPLabel2';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 600;
      this.mousePositionY = this.canvasTop + 160;
      this.componentList.push(temp);
    }, 100);

    setTimeout(() => {
      this.whatComponent = 'HPLabel3';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 540;
      this.mousePositionY = this.canvasTop + 200;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPLink4';
      temp = new LinkDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 430;
      this.mousePositionY = this.canvasTop + 240;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPLink5';
      temp = new LinkDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 560;
      this.mousePositionY = this.canvasTop + 240;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPLink6';
      temp = new LinkDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 690;
      this.mousePositionY = this.canvasTop + 240;
      this.componentList.push(temp);
    }, 100);

    setTimeout(() => {
      this.whatComponent = 'HPImage2';
      temp = new ImageDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 330;
      this.mousePositionY = this.canvasTop + 300;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPImage3';
      temp = new ImageDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 645;
      this.mousePositionY = this.canvasTop + 300;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPImage1';
      temp = new ImageDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 15;
      this.mousePositionY = this.canvasTop + 300;
      this.componentList.push(temp);
    }, 100);

    setTimeout(() => {
      this.whatComponent = 'HPP2';
      temp = new ParagraphDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 960;
      this.mousePositionY = this.canvasTop + 300;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPP3';
      temp = new ParagraphDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 960;
      this.mousePositionY = this.canvasTop + 400;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPP4';
      temp = new ParagraphDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 960;
      this.mousePositionY = this.canvasTop + 500;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPP5';
      temp = new ParagraphDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 960;
      this.mousePositionY = this.canvasTop + 350;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPP6';
      temp = new ParagraphDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 960;
      this.mousePositionY = this.canvasTop + 450;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HPP7';
      temp = new ParagraphDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 960;
      this.mousePositionY = this.canvasTop + 550;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = '';
    }, 100);
  }

  addComponentSearchScreen() {
    //Jan 3, 2021 - 1:20pm
    //left side of the form
    this.propertyCmp.clearComponent();
    let temp: IComponent;
    temp = new ButtonDragComponent(this.canvas);
    this.canvasLeft = (this.canvas.nativeElement as HTMLElement).offsetLeft;
    this.canvasTop = (this.canvas.nativeElement as HTMLElement).offsetTop;
    this.canvasW = (this.canvas.nativeElement as HTMLElement).offsetWidth;

    //navbar
    this.whatComponent = 'searchNavbar';
    temp = new NavbarDragComponent(this.canvas);
    this.mousePositionX = this.canvasLeft + 250;
    this.mousePositionY = this.canvasTop;
    this.componentList.push(temp);

    setTimeout(() => {
      this.whatComponent = 'userIDLabel';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 980;
      this.mousePositionY = this.canvasTop + 10;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'usernameLabel';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 1036;
      this.mousePositionY = this.canvasTop + 10;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'HomeButton';
      temp = new ButtonDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 1140;
      this.mousePositionY = this.canvasTop + 8;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'ProfileButton';
      temp = new ButtonDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 1210;
      this.mousePositionY = this.canvasTop + 8;
      this.componentList.push(temp);
    }, 100);

    //body
    setTimeout(() => {
      this.whatComponent = 'searchHeader';
      temp = new HeaderDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 250;
      this.mousePositionY = this.canvasTop + 140;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'carrierInput';
      temp = new InputDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 320;
      this.mousePositionY = this.canvasTop + 200;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'carrierLabel';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 240;
      this.mousePositionY = this.canvasTop + 210;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'invoiceInput';
      temp = new InputDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 320;
      this.mousePositionY = this.canvasTop + 250;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'invoiceFromLabel';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 155;
      this.mousePositionY = this.canvasTop + 260;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      temp = new DatepickerDragComponent(this.canvas, this.datepipe);
      this.mousePositionX = this.canvasLeft + 320;
      this.mousePositionY = this.canvasTop + 310;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'shippingFromLabel';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 162;
      this.mousePositionY = this.canvasTop + 310;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'deliveryInput';
      temp = new InputDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 320;
      this.mousePositionY = this.canvasTop + 350;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'deliveryNameLabel';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 195;
      this.mousePositionY = this.canvasTop + 360;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'addressInput';
      temp = new InputDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 320;
      this.mousePositionY = this.canvasTop + 400;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'addressLabel';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 235;
      this.mousePositionY = this.canvasTop + 410;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'remarksInput';
      temp = new InputDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 320;
      this.mousePositionY = this.canvasTop + 450;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'remarksLabel';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 230;
      this.mousePositionY = this.canvasTop + 460;
      this.componentList.push(temp);
    }, 100);

    // right side of the form
    setTimeout(() => {
      this.whatComponent = 'invoiceInput';
      temp = new InputDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 720;
      this.mousePositionY = this.canvasTop + 200;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'invoiceToLabel';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 575;
      this.mousePositionY = this.canvasTop + 210;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      temp = new DatepickerDragComponent(this.canvas, this.datepipe);
      this.mousePositionX = this.canvasLeft + 720;
      this.mousePositionY = this.canvasTop + 250;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'shippingToLabel';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 580;
      this.mousePositionY = this.canvasTop + 250;
      this.componentList.push(temp);
    }, 100);

    //buttons
    setTimeout(() => {
      this.whatComponent = 'SearchButton';
      temp = new ButtonDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 900;
      this.mousePositionY = this.canvasTop + 500;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = 'ClearButton';
      temp = new ButtonDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 965;
      this.mousePositionY = this.canvasTop + 500;
      this.componentList.push(temp);
    }, 100);
    setTimeout(() => {
      this.whatComponent = '';
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
