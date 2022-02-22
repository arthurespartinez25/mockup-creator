import { AppComponent } from './../../app.component';
import {
  //CdkDrag,
 // CdkDragEnd,
  DragDrop,
 // CdkDragDrop,
 // moveItemInArray,
} from '@angular/cdk/drag-drop';
import {
  AfterViewChecked,
  AfterViewInit,
 // ApplicationRef,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
 // EventEmitter,
  OnInit,
 // QueryList,
  Renderer2,
  ViewChild,
  //ViewChildren,
  Input,
  Output
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/service/users.service';
import { DatePipe } from '@angular/common'
import { PropertyComponent } from 'src/app/property/property.component';

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
  @Input() canvas: ElementRef;
  @Input() selected: IProperty;
  @Input() selectedComponent: IComponent;
  @Input() componentList: IComponent[];
  //@ViewChild('textOp') textBtn!: ElementRef;
 // @ViewChild('subMenuItem') subMenuItem!: ElementRef;
  //@ViewChild('subMenuItem2') subMenuItem2!: ElementRef;
  @ViewChild(PropertyComponent) propertyCmp:PropertyComponent;

  @Output() updatePropertyComponentEvent = new EventEmitter<PropertyComponent>();
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



  // canvasLeftX = 0;
  // canvasTopY = 0;
  // mousePositionX = 110;
  // mousePositionY = 110;
  // domInsideCanvas = false;
  // offsetLeft: any = 0;
  // offsetTop:any  = 0;
  // xDis: any = 0;
  // yDis: any = 0;
  // noOfButton: number = 0;
  // xDistance: any = 0;
  // yDistance: any = 0;
  // theUsername = "";
  

  // loggedIn($event) {
  //   /* console.log("eto value natin lods: " + this.sessionID); */
  //   this.theUsername = $event;
  //   console.log(this.theUsername as string);
  //   console.log("nakapagpasa na po");
  // }
  // logout() {
  //   this.loginCookie.deleteAll();
  //   this._router.navigate(['/']);
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 100);
  // }
  //----------------------------------------------------------------------------
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

  // deleteComponent(value: any) {
  //   let componentIndex = this.componentList.indexOf(value); //gets the index of the selected component inside the canvas
  //   if (componentIndex !== -1) {
  //     this.componentList.splice(componentIndex, 1); //removes the component from the canvas
  //   }
  // }

  // hideComponent(value: any) {
  //   let componentIndex = this.componentList.indexOf(value); //gets the index of the selected component inside the canvas
  //   this.componentList[componentIndex].props.hidden =
  //     !this.componentList[componentIndex].props.hidden; //removes visibility of a component from the canvas 
  // }

  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(
  //     this.componentList,
  //     event.previousIndex,
  //     event.currentIndex
  //   );
  //   //console.log("This is the previous index " + event.previousContainer);
  //   //console.log("This is the new index " + event.currentIndex);
  // }

  // //code below is for counting how many component of the same type are in the componentList
  // addToNoOfComponent(value: IComponent) {
  //   let componentIndex = this.componentList.indexOf(value);
  //   let checkbox,
  //     datepicker,
  //     dropdown,
  //     header,
  //     image,
  //     input,
  //     label,
  //     link,
  //     modal,
  //     navbar,
  //     paragraph,
  //     radio,
  //     table,
  //     textbox,
  //     youtube = 0; // create a variable for each type of component
  //   switch (this.componentList[componentIndex].props.typeObj) {
  //     case 'buttonDrag': {
  //       this.noOfButton++;
  //       this.numberOfComponents.push([value], ['Button' + this.noOfButton]);
  //     }
  //   }
  // }

  /**************End of code for component list functions *************************/


  /****************** OLD CODE STARTS HERE **********************/
}
function readCSSFile(arg0: string) {
  throw new Error('Function not implemented.');
}
