import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  OnInit,
  ViewChild,
  Input,
  Output
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common'
import { PropertyComponent } from 'src/app/property/property.component';
import { CssComponent } from './css/css.component';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit, AfterViewInit, AfterViewChecked {
  title = 'mockup-creator';
  index: number;
  numberOfComponents: any = [];
  ref: ComponentRef<any>;
  readonly CSS_URL = '../app/app.component.css';
  refreshCSS = new BehaviorSubject<boolean>(true);
  cssDocument?: StyleSheet;
  users: any;

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
  @ViewChild(CssComponent) cssComponent: CssComponent;
  @Input() canvas: ElementRef;
  @Input() selected: IProperty;
  @Input() selectedComponent: IComponent;
  @Input() componentList: IComponent[];
  @Input() projectName: string;
  @Input() tabList: any;
  @Input() currentTab: string;
  //@ViewChild('textOp') textBtn!: ElementRef;
  @ViewChild('subMenuItem') subMenuItem!: ElementRef;
  @ViewChild('subMenuItem2') subMenuItem2!: ElementRef;
  @ViewChild(PropertyComponent) propertyCmp:PropertyComponent;

  @Output() updatePropertyComponentEvent = new EventEmitter<PropertyComponent>();
  @Output() clearComponentListEvent = new EventEmitter<number>();
  @Output() updateComponentListEvent = new EventEmitter<IComponent[]>();
  @Output() updateStyleEvent = new EventEmitter<string>();  

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
    console.log(this.canvas);
    this.updatePropertyComponentEvent.emit(this.propertyCmp);
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
  domInsideCanvas = false;
  offsetLeft: any = 0;
  offsetTop:any  = 0;
  xDis: any = 0;
  yDis: any = 0;
  noOfButton: number = 0;
  xDistance: any = 0;
  yDistance: any = 0;
  theUsername = "";
  
  //----------------------------------------------------------------------------
  clearComponentList() {
    this.clearComponentListEvent.next(0);
  }

  updateComponentList(value: IComponent[]) {
    this.updateComponentListEvent.emit(value);
  }

  updateStyle(value: string) {
    this.style = value;
    this.updateStyleEvent.emit(value);
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

  ngAfterViewChecked() {
    this.changeref.detectChanges();
  }

  refresh(): void {
    this._router
      .navigateByUrl('/refresh', { skipLocationChange: true })
      .then(() => {
        this._router.navigate([decodeURI(this._location.path())]);
      });
  }
  
  cssReceiveMessage() {
    this.cssComponent.cssReceiveMessage();
  }

  addAllCSSRule(allCSSRule: any) {
    this.cssComponent.addAllCSSRule(allCSSRule);
  }

  clearCss() {
    this.cssComponent.clearCss();
  } 

  /****************** OLD CODE STARTS HERE **********************/
}
function readCSSFile(arg0: string) {
  throw new Error('Function not implemented.');
}
