import { CdkDragDrop, CdkDragEnd, DragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ComponentRef, ElementRef, Input, OnInit, Output, Renderer2, ViewChild, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
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

  @Output() updateSelectedEvent = new EventEmitter<IProperty>();

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
    this.updateSelectedEvent.emit(this.selected);
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
  refresh(): void {
    this._router
      .navigateByUrl('/refresh', { skipLocationChange: true })
      .then(() => {
        this._router.navigate([decodeURI(this._location.path())]);
      });
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
