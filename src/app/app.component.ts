import { CdkDragEnd, DragDrop } from '@angular/cdk/drag-drop';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { IComponent } from './interfaces/icomponent';
import { ButtonComponent } from './components/button/button.component';
import { PopupComponent } from './components/popup/popup.component';
import { TextboxComponent } from './components/textbox/textbox.component';
import { IProperty } from './interfaces/iproperty';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { ImageComponent } from './components/image/image.component';
import { LabelComponent } from './components/label/label.component';
import { RadioComponent } from './components/radio/radio.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ButtonDragComponent } from './components/buttonDrag/buttonDrag.component';
import { LabelDragComponent } from './components/labelDrag/labelDrag.component';
import { CheckboxDragComponent } from './components/checkboxDrag/checkboxDrag.component';
import { DropdownDragComponent } from './components/dropdownDrag/dropdownDrag.component';
import { ImageDragComponent } from './components/imageDrag/imageDrag.component';
import { RadioDragComponent } from './components/radioDrag/radioDrag.component';
import { TextboxDragComponent } from './components/textboxDrag/textboxDrag.component';
import { PopupDragComponent } from './components/popupDrag/popupDrag.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalComponent } from './components/modal/modal.component';
import { InputComponent } from './components/input/input.component';
import { HeaderComponent } from './components/header/header.component';
import { LinkComponent } from './components/link/link.component';
import { ParagraphComponent } from './components/paragraph/paragraph.component';
import { FormArray } from '@angular/forms';
import { ParagraphDragComponent } from './components/paragraphDrag/paragraphDrag.component';
import { NavbarDragComponent } from './components/navbarDrag/navbarDrag.component';
import { ModalDragComponent } from './components/modalDrag/modalDrag.component';
import { DatepickerDragComponent } from './components/datepickerDrag/datepickerDrag.component';
import { HeaderDragComponent } from './components/headerDrag/headerDrag.component';
import { InputDragComponent } from './components/inputDrag/inputDrag.component';
import { LinkDragComponent } from './components/linkDrag/linkDrag.component';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.palette.component.css'],
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'mockup-creator';
  index: number;
  componentList: IComponent[] = [];
  selectedComponent: IComponent;
  ref: ComponentRef<any>;
  readonly CSS_URL ='../app/app.component.css';
  refreshCSS = new BehaviorSubject<boolean>(true);
  cssDocument?:StyleSheet;

  selected: IProperty = {
    key: '',
    id: '',
    value: '',
    class: '',
    style: '',
    typeObj: '',
    type: '',
  };

  public cssRuleCount = document.styleSheets[0].cssRules.length;
  public _popupCount = 0;
  private _styleStart = '<style>';
  private _styleEnd = '</style>';
  private _styleBody = '';
  private _htmlStart = '<!doctype html>\n<html lang="en">';
  private _htmlEnd = '</html>';
  private _bootstrapLink =
    '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet">';
  private _bootstrapScript =
    '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></script>';
  private _popupFunction =
    '<script>\nvar popoverTriggerList = [].slice.call(document.querySelectorAll(\'[data-bs-toggle="popover"]\'))\nvar popoverList = popoverTriggerList.map(function (popoverTriggerEl) {\nreturn new bootstrap.Popover(popoverTriggerEl)\n})\n</script>';

  @ViewChild('PropertyComponent') property: boolean;
  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('cssWrapperDocument') cssWrapperDocument!: CSSStyleSheet;

  constructor(
    private renderer: Renderer2, 
    private drag: DragDrop, 
    private doms : DomSanitizer, 
    private http:HttpClient,
    public _router: Router,
    public _location: Location
    ) {}
  delete: boolean;
  cssBody: SafeStyle;
  canvasBG: string;

  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
    //this.removeElement();
  }
  ngOnInit(): void {
    /* throw new Error('Method not implemented.'); */
  }

  addComponent(component: string) {
    let temp: IComponent;
    switch (component) {
      case 'nav':
        temp = new NavbarComponent(this.canvas);
        break;
      case 'link':
        temp = new LinkComponent(this.canvas);
        break;
      case 'paragraph':
        temp = new ParagraphComponent(this.canvas);
        break;

      case 'button':
        temp = new ButtonComponent(this.canvas);
        break;
      case 'textbox':
        temp = new TextboxComponent(this.canvas);
        break;
      case 'radio':
        temp = new RadioComponent(this.canvas);
        break;

      case 'checkbox':
        temp = new CheckboxComponent(this.canvas);

        break;

      case 'dropdown':
        temp = new DropdownComponent(this.canvas);

        break;
      case 'datepicker':
        temp = new DatepickerComponent(this.canvas);
        break;

      case 'modal':
        temp = new ModalComponent(this.canvas);
        break;

      case 'label':
        temp = new LabelComponent(this.canvas);

        break;
      case 'img':
        temp = new ImageComponent(this.canvas);
        break;

      case 'header':
        temp = new HeaderComponent(this.canvas);
        break;

      case 'input':
        temp = new InputComponent(this.canvas);
        break;
      case 'popup':
        this._popupCount++;
        temp = new PopupComponent(this.canvas);
        break;
      default:
        temp = new ButtonComponent(this.canvas);
    }

    this.componentList.push(temp);
  }
  //----------------------------------------------------------------------------

  mousePositionX = 110;
  mousePositionY = 110;
  domInsideCanvas = false;

  onDragEnded(event: CdkDragEnd) {
    event.source._dragRef.reset();
    const { offsetLeft, offsetTop } = event.source.element.nativeElement;
    const { x, y } = event.distance;
    this.mousePositionX = offsetLeft + x;
    this.mousePositionY = offsetTop + y;
  }

  onDragEndedAddComponent(component: string) {
    if (this.domInsideCanvas == true) {
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
          temp = new DatepickerDragComponent(this.canvas);
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

        default:
          temp = new ButtonComponent(this.canvas);
      }

      this.componentList.push(temp);
    }
  }

  //----------------------------------------------------------------------------

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
      tmpHtmlBody = tmpHtmlBody + value.htmlCode + '\n';
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
      bootstrap +
      this.htmlBody() +
      '\n' +
      this._htmlEnd +
      '\n' +
      script +
      this._styleStart +
      '\n' +
      this.style +
      '\n' +
      this._styleEnd
    );
  }

  clickHandler(component: IComponent) {
    this.selected = component.props;
    this.selectedComponent = component;
  }

  getCSSStyle(style: string){
    return this.doms.bypassSecurityTrustStyle(style);
    this.refreshCSS.next(true);
  }

  refresh(): void{
    this._router.navigateByUrl("/refresh", {skipLocationChange:true}).then(() => {
      //console.log([decodeURI(this._location.path())]);
      this._router.navigate([decodeURI(this._location.path())]);
    });
  }

  cssString(){
    console.log(
      this._styleStart +
      '\n' +
      this.style +
      '\n' +
      this._styleEnd
    );
    return(
      this._styleStart +
      '\n' +
      this.style +
      '\n' +
      this._styleEnd
    );
  }

  /*************Here Starts CSS Code******************/

  /*
  receiveWrapperStyleSheet(wrapperStylesheet:any){
    this.cssDocument = wrapperStylesheet.target.value;
    console.log(this.cssDocument);
    console.log(wrapperStylesheet.target.value);
    console.log("Gagana nato");
  }
  */

  cssReceiveMessage(){
    this.style = "";
    console.log(document.styleSheets.item(0));
    let  newCssRuleCount = document.styleSheets[0].cssRules.length;
    let cssString:string;

    for(let i=this.cssRuleCount; i < newCssRuleCount; i++){
      cssString = document.styleSheets[0].cssRules[i].cssText.toString();
      //console.log(document.styleSheets[0].cssRules[i].cssText.toString().substring(0,7));
      if(document.styleSheets[0].cssRules[i].cssText.toString().substring(0,11) == "#canvasBody"){
        if(document.styleSheets[0].cssRules[i].cssText.toString().substring(11,13) == " {"){
        this.style += "body" + cssString.substring(11,cssString.length);
        this.style += "\n\n";
      }else{
        this.style += cssString.substring(11,cssString.length);
        this.style += "\n\n";
      }
        //console.log(cssString);
      }else{
        this.style += document.styleSheets[0].cssRules[i].cssText.toString();
        this.style += "\n\n";
        //console.log(document.styleSheets[0].cssRules[i].cssText.toString());
      }
      //console.log(document.styleSheets[0].cssRules[i].cssText.toString().substring(0,11));
    }
  }


  addCSSRule(cssString: string) {
    //console.log(this.style);
    let  newCssRuleCount = document.styleSheets[0].cssRules.length;
    //const select = document.querySelector('styleSelectorID');
    //let cssRuleString = document.styleSheets[0].cssRules[this.cssRuleCount].cssText.toString();
    let cssStringTemp;
    let cssRuleStringTemp: string; 
    let cssCanvasSelector = cssString.substring(0, cssString.indexOf('{'));;
    let cssRuleStringClassID = cssString.substring(0, cssString.indexOf('{'));
    let ruleFound = 0;
    let ruleNumber;
    let generalRule = false;

    
    if(cssString[0] == '.'){
      console.log(cssRuleStringClassID + " is a Class selector");
    }
    else if(cssString[0] == '#'){
      console.log(cssRuleStringClassID + " is an ID selector");
    }
    else if((cssString[0] != '#') && (cssString[0] != '.')){
      generalRule = true;
      console.log("\""+cssCanvasSelector+"\" is a general Selector;");
    }

    //console.log("This is the selector: " + cssString.substring(0, cssString.indexOf('{')).toString());
    if (generalRule == true){
      switch(cssString.substring(0, cssString.indexOf('{'))){
        case 'body':{
          console.warn("The CSS rule is for the 'body' selector, retype the rule.");
          cssStringTemp = "#canvasBody " + cssString.substring(cssString.indexOf('{')).toString();
          console.log(cssStringTemp);
          /*
          this.cssBody = this.doms.bypassSecurityTrustStyle(cssString.substring(cssString.indexOf('{')).toString());
          this.cssBody = 
            "\"{\'" + 
            cssString.substring(cssString.indexOf('{')+2,cssString.indexOf(':')) + 
            "\'" + ":" + "\'" +
            cssString.substring(cssString.indexOf(':')+1,cssString.indexOf(';')) +
            "\'}\"";
          */
          break;
        }
        /*
        case 'button':{
          console.warn("The CSS rule is for the 'button' selector, retype the rule.");
          break;
        }
        */
        default:{
          cssStringTemp = "#canvasBody " + cssCanvasSelector + cssString.substring(cssString.indexOf('{')).toString();
          console.log(cssStringTemp);
          //console.log("Nothing to compare to.");
          break;
        }
      }
    }else{
      for(let i=this.cssRuleCount; i < newCssRuleCount; i++){
        cssRuleStringTemp = document.styleSheets[0].cssRules[i].cssText.toString();
        if(cssRuleStringTemp.substring(0, cssString.indexOf('{')) === (cssRuleStringClassID).toString())
        {
          console.log("Class found!");
          ruleFound = 1;
          ruleNumber = i;
        }
        else if(cssRuleStringTemp.substring(0, cssString.indexOf('{')) === (cssRuleStringClassID).toString())
        {
          console.log("ID found!");
          ruleFound = 1;
          ruleNumber = i;
        }
        //console.log(cssRuleStringTemp.substring(0, cssString.indexOf('{')).toString());
      }
    }

    if(ruleFound == 1 && generalRule == false){
      console.log("this is the ruleNumber: " + ruleNumber);
      document.styleSheets.item(0)?.insertRule("\n" + cssString + "\n", document.styleSheets[0].cssRules.length);
      document.styleSheets.item(0)?.deleteRule(ruleNumber);
      console.log(
        "this CSS rule exist, updating..." + 
        document.styleSheets[0].cssRules[ruleNumber].cssText.toString() +
        " to " + 
        document.styleSheets[0].cssRules[document.styleSheets[0].cssRules.length-1].cssText.toString()
      );
      ruleFound = 0;
    }else if(ruleFound == 0 && generalRule == false){
      document.styleSheets.item(0)?.insertRule("\n" + cssString + "\n", document.styleSheets[0].cssRules.length);
      console.log("adding style to: " + document.styleSheets[0].cssRules[this.cssRuleCount].cssText.toString());
    }
    else if (ruleFound == 0 && generalRule == true){
      //console.log("The Rule you are trying to edit is a general CSS Rule. Add a Class or ID.");
      document.styleSheets.item(0)?.insertRule("\n " + cssStringTemp + "\n", document.styleSheets[0].cssRules.length);
      console.log("adding style to: " + document.styleSheets[0].cssRules[this.cssRuleCount].cssText.toString());
    }

    console.log("this is the starting number: " + this.cssRuleCount);
    console.log(document.styleSheets.item(0));
  }


  deleteCSSRule(cssString: string) {
    let  newCssRuleCount = document.styleSheets[0].cssRules.length;
    let cssRuleStringTemp: string; 
    let cssRuleStringClassID = cssString.substring(0, cssString.indexOf('{'));
    let ruleFound = 0;
    let ruleNumber;
    for(let i=this.cssRuleCount; i < newCssRuleCount; i++){
      cssRuleStringTemp = document.styleSheets[0].cssRules[i].cssText.toString();
      //console.log(cssRuleStringTemp);
      if(
        (cssRuleStringTemp.includes(cssRuleStringClassID)) 
        || (cssRuleStringTemp.substring(0, cssString.indexOf('{')).includes("#canvasBody "+cssRuleStringClassID)) 
        || (cssRuleStringClassID == "#canvasBody ")
      ){
        console.log("rule found!");
        ruleFound = 1;
        ruleNumber = i;
      }
    }
    if(ruleFound == 1){
      document.styleSheets.item(0)?.deleteRule(ruleNumber);
      console.log("Rule " + ruleNumber + " deleted");
    }else if(ruleFound == 0){
      console.log("Rule doesn't exist");
    }
  }

  /*
  changeHandler(event: any) {
    //this.style(String(event.target.value));
    //console.log("'"+event.target.value+"'")
    let _cssLength = new Array(document.styleSheets.item(0));
    //document.styleSheets.item(0)?.deleteRule();
    //console.log(_cssLength.length);
    console.log(document.styleSheets.item(0));
    console.log(document.styleSheets[0].cssRules.length);
    document.styleSheets.item(0)?.insertRule("\n" + event.target.value, document.styleSheets[0].cssRules.length);
    console.log("deleting: " + document.styleSheets.item(document.styleSheets[0].cssRules.length));
    document.styleSheets.item(0)?.deleteRule(document.styleSheets[0].cssRules.length-1);
  }
  */

  /*************Here Ends CSS Code******************/

  receiveMessage($event: boolean) {
    if ($event == true) {
      //removeElement(component: IComponent): void {
      //console.log(componentID);
      //let temp: IComponent;
      //temp = new ButtonComponent(this.canvas);
      //this.temp = component.props
      //this.componentList.splice(component);
      //this.componentList.splice(componentID,1);

      let componentIndex = this.componentList.indexOf(this.selectedComponent);
      if (componentIndex !== -1) {
        this.componentList.splice(componentIndex, 1);
        this.selected.id = '';
        this.selected.type = '';
        this.selected.key = '';
        this.selected.value = '';
        this.selected.class = '';
        this.selected.style = '';
        this.selected.typeObj = '';
        this.selected.placeholder = '';
        this.selected.rows = -1;
        this.selected.cols = -1;
        this.selected.name = '';
        console.log('Deleted');
        $event = false;
      }
    } else {
      console.log('Nothing to delete');
    }
  }

  // deleteComponent(){
  //   let componentIndex = this.componentList.indexOf(this.selectedComponent);
  //   if(componentIndex !== -1){
  //     this.componentList.splice(componentIndex,1);
  //   }
  // }

  /****************** OLD CODE STARTS HERE **********************/
}
function readCSSFile(arg0: string) {
  throw new Error('Function not implemented.');
}

