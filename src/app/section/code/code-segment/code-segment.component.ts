import {
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
import { CrossComponentBridge } from 'src/app/service/cross-component-bridge/crossComponentBridge.service';

@Component({
  selector: 'app-code-segment',
  templateUrl: './code-segment.component.html',
  styleUrls: ['./code-segment.component.css']
})
export class CodeSegmentComponent implements OnInit {
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
    @Input() _styleBody: string;
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
  
    changeref: ChangeDetectorRef;
    constructor(
      private loginCookie:CookieService,
      changeDetectorRef: ChangeDetectorRef,
      public _router: Router,
      public _location: Location,
      public sanitizer: DomSanitizer,
      public datepipe: DatePipe,
      private crossComponentBridge: CrossComponentBridge
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
      if (this.projectName == '') {
        this.crossComponentBridge.setValue(1);
      } else {
        let index = this.tabList.findIndex(x => x.id === this.currentTab);
        let fileName = this.tabList[index].name + ".html";
        fileName = fileName.replace(/ +/g, "");
        let file = new Blob([val], { type: 'text/html' });
        console.log(fileName);
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, fileName); //multiple tabs can be opened (since there are multiple file names)
        //window.open(fileURL, 'index.html'); //only opens in one tab
      }
    }
    refresh(): void {
      this._router
        .navigateByUrl('/refresh', { skipLocationChange: true })
        .then(() => {
          this._router.navigate([decodeURI(this._location.path())]);
        });
    }
  }