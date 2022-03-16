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
import { Router, ɵEmptyOutletComponent } from '@angular/router';
import { Location } from '@angular/common';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common'
import { PropertyComponent } from 'src/app/property/property.component';

@Component({
  selector: 'app-css',
  templateUrl: './css.component.html',
  styleUrls: ['./css.component.css']
})
export class CssComponent implements OnInit, AfterViewInit, AfterViewChecked {
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

  @ViewChild('PropertyComponent') property: boolean;
  @Input() canvas: ElementRef;
  @Input() selected: IProperty;
  @Input() selectedComponent: IComponent;
  @Input() componentList: IComponent[];
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
  usedMarginPercent: boolean;
  
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


  ngAfterViewChecked() {
    this.changeref.detectChanges();
  }
  styleHolder = 'aw';
  isDisabled = true;

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
    let marginTop, marginValueTop, finalValueTop;
    let marginLeft, marginValueLeft, finalValueLeft;

    for (let i = this.cssRuleCount; i < newCssRuleCount; i++) { //compares web-app default cssRule count with the added cssRules
      cssString = document.styleSheets[0].cssRules[i].cssText.toString();
      if(this.usedMarginPercent){
        marginTop = cssString.match(/(margin-top):(\s)*(\d)*\.?(\d)*px;/)?.toString();
        marginValueTop = marginTop.match(/\d+\.?\d+/)?.toString();
        finalValueTop = Math.round(((marginValueTop/720)*100));
        cssString = cssString.replace(/(margin-top):(\s)*(\d)*\.?(\d)*px;/g, "margin-top: "+finalValueTop+"vh;")

        marginLeft = cssString.match(/(margin-left):(\s)*(\d)*\.?(\d)*px;/)?.toString();
        marginValueLeft = marginLeft.match(/\d+\.?\d+/)?.toString();
        finalValueLeft = Math.round(((marginValueLeft/1280)*100));
        cssString = cssString.replace(/(margin-left):(\s)*(\d)*\.?(\d)*px;/g, "margin-left: "+finalValueLeft+"%;")
      }
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
        this.style += cssString; //adds regular selector to style
        this.style += '\n';
      }
    }
    this.updateStyleEvent.emit(this.style);
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
    this.usedMarginPercent = false;
    let newCssRuleCount = document.styleSheets[0].cssRules.length;
    let cssStringTemp;
    let cssRuleStringTemp: string;
    let cssCanvasSelector = cssString.substring(0, cssString.indexOf('{'));
    let cssRuleStringClassID = cssString.substring(0, cssString.indexOf('{'));
    let ruleFound = 0;
    let ruleNumber;
    let generalRule = false;
    let marginValueLeft, finalValueLeft, marginLeft;
    let marginValueTop, finalValueTop, marginTop;

    if(cssString.match(/(margin-left):(\s)*(\d)*%;/g)){
      marginValueLeft = cssString.match(/(margin-left):(\s)*(\d)*%;/g)?.toString().replace(/\D/g, "");
      finalValueLeft = (marginValueLeft/100)*1280;
      marginLeft = 'margin-left:'+finalValueLeft+'px;';
      cssString = cssString.replace(/(margin-left):(\s)*(\d)*%;/g, marginLeft);
      this.usedMarginPercent = true;
    }

    if(cssString.match(/(margin-top):(\s)*(\d)*%;/g)){
      marginValueTop = cssString.match(/(margin-top):(\s)*(\d)*%;/g)?.toString().replace(/\D/g, "");
      finalValueTop = (marginValueTop/100)*720;
      marginTop = 'margin-top:'+finalValueTop+'px;';
      cssString = cssString.replace(/(margin-top):(\s)*(\d)*%;/g, marginTop);
      this.usedMarginPercent = true;
    }

    console.log(cssString)

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
}