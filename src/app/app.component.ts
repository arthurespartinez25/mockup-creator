import { CdkDrag, CdkDragEnd, DragDrop } from '@angular/cdk/drag-drop';
import {
  AfterViewChecked,
  AfterViewInit,
  ApplicationRef,
  ChangeDetectorRef,
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

import { TableComponent } from './components/table/table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.palette.component.css'],
})

export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {
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
    draggable: true,
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
  @ViewChild('textOp') textBtn!: ElementRef;
  @ViewChild('cssWrapperDocument') cssWrapperDocument!: CSSStyleSheet;

  changeref: ChangeDetectorRef;
  constructor(
    private renderer: Renderer2,
    private drag: DragDrop,
    changeDetectorRef: ChangeDetectorRef,
    private http:HttpClient,
    public _router: Router,
    public _location: Location
  ) {
    this.changeref = changeDetectorRef;
  }
  delete: boolean;
  cssBody: SafeStyle;
  canvasBG: string;

  canvasLeft = 0;
  canvasTop = 0;
  canvasW = 0;
  xCounter = 0;
  jjj = true;
  whatComponent = 'none';

  ngOnInit(): void {
    /* throw new Error('Method not implemented.'); */
  }
  ngAfterViewInit(): void {}

  addComponent(component: string) {
    let temp: IComponent;
    switch (component) {
      case 'nav':
        temp = new NavbarComponent(this.canvas);
        break;
      case 'link':
        ``;
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
      case 'table':
        temp = new TableComponent(this.canvas, this.changeref);
        break;
      default:
        temp = new ButtonComponent(this.canvas);
        console.log('No Component Added');
    }
    this.xCounter++;
    this.canvasLeft = (this.canvas.nativeElement as HTMLElement).offsetLeft;
    this.canvasTop = (this.canvas.nativeElement as HTMLElement).offsetTop;
    this.canvasW = (this.canvas.nativeElement as HTMLElement).offsetWidth;
    //console.log(this.canvasW+"rawr");
    this.componentList.push(temp);
  }
  //----------------------------------------------------------------------------

  mousePositionX = 110;
  mousePositionY = 110;
  domInsideCanvas = false;

  /*
  disableDragging(){
    let componentIndex = this.componentList.indexOf(this.selectedComponent);
    if (componentIndex !== -1) {
      this.selected.draggable = false;
    }
  }*/

  onDragEnded(event: CdkDragEnd) {
    event.source._dragRef.reset();
    const { offsetLeft, offsetTop } = event.source.element.nativeElement;
    const { x, y } = event.distance;
    this.mousePositionX = offsetLeft + x;
    this.mousePositionY = offsetTop + y;
    
  }

  onDragEndedText(event: CdkDragEnd) {
    event.source._dragRef.reset();
    const { offsetLeft, offsetTop } = event.source.element.nativeElement;
    const { x, y } = event.distance;
    let canvasLeftX = (this.textBtn.nativeElement as HTMLElement).offsetWidth;
    let canvasTopY = (this.textBtn.nativeElement as HTMLElement).offsetTop;
    this.mousePositionX = offsetLeft + x + canvasLeftX;
    this.mousePositionY = offsetTop + y + canvasTopY;
    //console.log(x);
    //console.log(this.canvasLeft);
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
      this.xCounter++;
      console.log(this.xCounter);
      this.canvasLeft = (this.canvas.nativeElement as HTMLElement).offsetLeft;
      this.canvasTop = (this.canvas.nativeElement as HTMLElement).offsetTop;
      this.canvasW = (this.canvas.nativeElement as HTMLElement).offsetWidth;
      console.log(this.canvasW + 'rawr');
      this.componentList.push(temp);
    }
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
      '\n' +
      this._styleEnd
    );
  }
  mouseMoveX = 0;
  mouseMoveY = 0;

  //const { x, y } = event.;
  //this.mouseMoveX = event.offsetX + event.distanceX;
  //this.mouseMoveY = event.offsetY;
  //let x = event.target.getBoundingClientRect();
  /*let x = document.body.getBoundingClientRect();
    let y = $event.target.getBoundingClientRect();
    this.mouseMoveX = y.left - x.left;
    this.mouseMoveY = y.top - x.top;*/
  //this.mouseMoveX = $event.source.getFreeDragPosition().x;
  //this.mouseMoveY = $event.source.getFreeDragPosition().y;
  mouseGalawX($event: any) {}

  passData2(item: any) {
    //console.warn(item);
    this.mouseMoveX = item;
  }
  passDataX(item: any) {
    //console.warn(item);
    this.mouseMoveY = item;
  }

  ngAfterViewChecked() {}
  jude = 'aw';
  clickHandler(component: IComponent) {
    this.selected = component.props;
    this.selectedComponent = component;
    if (this.mouseMoveX != 0 && this.mouseMoveY != 0) {
      this.jude = this.selected.style;
      let regexLeft = /left(.+?);/;
      let regexTop = /top(.+?);/;
      let regexPosition = /position(.+?);/;
      this.jude = this.jude.replace(regexLeft, '');
      this.jude = this.jude.replace(regexTop, '');
      this.jude = this.jude.replace(regexPosition, '');
      this.selected.style = this.selected.style;
      //this.mouseMoveX = this.mouseMoveX;
      //this.mouseMoveY = this.btnCmp.mousePositionYV2;
      this.selected.style =
        this.jude +
        'position:sticky;' +
        'left:' +
        this.mouseMoveX +
        'px;' +
        'top:' +
        this.mouseMoveY +
        'px;' /*+
      "position:fixed;"*/;
      this.mouseMoveX = 0;
      this.mouseMoveY = 0;
    } else if (
      this.mouseMoveY != 0 &&
      (this.selected.typeObj == 'nav' || 'navDrag')
    ) {
      this.jude = this.selected.style;
      let regexLeft = /left(.+?);/;
      let regexTop = /top(.+?);/;
      let regexPosition = /position(.+?);/;
      this.jude = this.jude.replace(regexLeft, '');
      this.jude = this.jude.replace(regexTop, '');
      this.jude = this.jude.replace(regexPosition, '');
      this.selected.style = this.selected.style;
      //this.mouseMoveX = this.mouseMoveX;
      //this.mouseMoveY = this.btnCmp.mousePositionYV2;
      this.selected.style =
        this.jude +
        'position:sticky;' +
        'left:' +
        this.mouseMoveX +
        'px;' +
        'top:' +
        this.mouseMoveY +
        'px;' /*+
      "position:fixed;"*/;
      this.mouseMoveX = 0;
      this.mouseMoveY = 0;
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
    a.download = 'index';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
  addComponentLogin() {
    let temp: IComponent;
    temp = new ButtonDragComponent(this.canvas);
    this.xCounter++;
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
  }
  addComponentImageLabel() {
    let temp: IComponent;
    temp = new ButtonDragComponent(this.canvas);
    this.xCounter++;
    this.canvasLeft = (this.canvas.nativeElement as HTMLElement).offsetLeft;
    this.canvasTop = (this.canvas.nativeElement as HTMLElement).offsetTop;
    this.canvasW = (this.canvas.nativeElement as HTMLElement).offsetWidth;

    this.whatComponent = 'sampleImage';
    temp = new ImageDragComponent(this.canvas);
    this.mousePositionX = this.canvasLeft + 450;
    this.mousePositionY = this.canvasTop + 140;
    this.componentList.push(temp);
  }

  /*getCSSStyle(style: string){
    return this.doms.bypassSecurityTrustStyle(style);
    this.refreshCSS.next(true);
  }*/

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
        this.style += "\n";
      }else{
        this.style += cssString.substring(11,cssString.length);
        this.style += "\n";
      }
        //console.log(cssString);
      }else{
        this.style += document.styleSheets[0].cssRules[i].cssText.toString();
        this.style += "\n";
        //console.log(document.styleSheets[0].cssRules[i].cssText.toString());
      }
      //console.log(document.styleSheets[0].cssRules[i].cssText.toString().substring(0,11));
    }
  }

  addAllCSSRule(allCSSRule: any){
    //console.log(allCSSRule.length);
    let allCSSRuleCount = 0;
    let stringIndex = 0;
    let startingIndex = 0;
    let curlyBraces = 0;
    let cssString = "";
    let newCSSRule = "";
    let newCSSRuleCount = document.styleSheets[0].cssRules.length;
    
    while(document.styleSheets[0].cssRules.length != this.cssRuleCount){
      let numberOfRules = document.styleSheets[0].cssRules.length - this.cssRuleCount;
      //let cssRuleStringTemp = document.styleSheets[0].cssRules[newCSSRuleCount-1].cssText.toString();
      //console.log("deleting: " + cssRuleStringTemp);
      console.log("this is the start of RuleCount: " + this.cssRuleCount);
      console.log("this is the current RuleCount: " + (document.styleSheets[0].cssRules.length-1));
      console.log("this is the new RuleCount: " + numberOfRules);
      document.styleSheets.item(0)?.deleteRule(document.styleSheets[0].cssRules.length-1);
    }
    
    
    for(let i = 0; i < allCSSRule.length; i++){
      if(allCSSRule[i] != " " && allCSSRule[i] != "\n"){
        newCSSRule += allCSSRule[i];
        //console.log(newCSSRule);
      }
      else{
        console.log("White space detected at: " + i);
      }
    }
    console.log(newCSSRule.toString());

    while(stringIndex < newCSSRule.length-1){
      for(let i = stringIndex; i <= newCSSRule.length-1; i++){
        //console.log(allCSSRule[i].toString());
        if(newCSSRule[i] == '{'){
          curlyBraces++;
        }
        if(newCSSRule[i] == '}' && curlyBraces >= 2){
          curlyBraces--;
        }
        else if(newCSSRule[i] == '}' && curlyBraces == 1){
          curlyBraces--;
          cssString = ""
          cssString = newCSSRule.substring(startingIndex, i + 1).toString();

          //console.log(cssString.toString());
          //this.deleteCSSRule(cssString.toString());
          this.addCSSRule(cssString.toString());
          stringIndex = 1 + i;
          startingIndex = 1 + i;
          /*
          console.log(
            "this is the new starting index: " + startingIndex +
            "\nand we added the rule\n" + cssString.toString())
          */
          allCSSRuleCount++;
          break;
        }
        //console.log(i);
        //console.log(i + "," + stringIndex);
        //console.log(allCSSRule.substring(startingIndex, startingIndex + i));
      }
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
          //console.warn("The CSS rule is for the 'body' selector, retype the rule.");
          cssStringTemp = "#canvasBody " + cssString.substring(cssString.indexOf('{')).toString();
          //console.log(cssStringTemp);
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
          //console.log(cssStringTemp);
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
      /*
      console.log(
        "this CSS rule exist, updating..." + 
        document.styleSheets[0].cssRules[ruleNumber].cssText.toString() +
        " to " + 
        document.styleSheets[0].cssRules[document.styleSheets[0].cssRules.length-1].cssText.toString()
      );
      */
      ruleFound = 0;
    }else if(ruleFound == 0 && generalRule == false){
      document.styleSheets.item(0)?.insertRule("\n" + cssString + "\n", document.styleSheets[0].cssRules.length);
      //console.log("adding style to: " + document.styleSheets[0].cssRules[this.cssRuleCount].cssText.toString());
    }
    else if (ruleFound == 0 && generalRule == true){
      //console.log("The Rule you are trying to edit is a general CSS Rule. Add a Class or ID.");
      document.styleSheets.item(0)?.insertRule("\n " + cssStringTemp + "\n", document.styleSheets[0].cssRules.length);
      //console.log("adding style to: " + document.styleSheets[0].cssRules[this.cssRuleCount].cssText.toString());
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

  addComponentSearchScreen() {
    //Jan 3, 2021 - 1:20pm
    //left side of the form
    let temp: IComponent;
    temp = new ButtonDragComponent(this.canvas);
    this.xCounter++;
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
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'usernameLabel';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 1036;
      this.mousePositionY = this.canvasTop + 10;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'HomeButton';
      temp = new ButtonDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 1140;
      this.mousePositionY = this.canvasTop + 8;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'ProfileButton';
      temp = new ButtonDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 1210;
      this.mousePositionY = this.canvasTop + 8;
      this.componentList.push(temp);
    }, 1);

    //body
    setTimeout(() => {
      this.whatComponent = 'searchHeader';
      temp = new HeaderDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 250;
      this.mousePositionY = this.canvasTop + 140;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'carrierInput';
      temp = new InputDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 320;
      this.mousePositionY = this.canvasTop + 200;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'carrierLabel';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 240;
      this.mousePositionY = this.canvasTop + 210;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'invoiceInput';
      temp = new InputDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 320;
      this.mousePositionY = this.canvasTop + 250;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'invoiceFromLabel';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 155;
      this.mousePositionY = this.canvasTop + 260;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      temp = new DatepickerDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 320;
      this.mousePositionY = this.canvasTop + 310;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'shippingFromLabel';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 162;
      this.mousePositionY = this.canvasTop + 310;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'deliveryInput';
      temp = new InputDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 320;
      this.mousePositionY = this.canvasTop + 350;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'deliveryNameLabel';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 195;
      this.mousePositionY = this.canvasTop + 360;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'addressInput';
      temp = new InputDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 320;
      this.mousePositionY = this.canvasTop + 400;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'addressLabel';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 235;
      this.mousePositionY = this.canvasTop + 410;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'remarksInput';
      temp = new InputDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 320;
      this.mousePositionY = this.canvasTop + 450;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'remarksLabel';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 230;
      this.mousePositionY = this.canvasTop + 460;
      this.componentList.push(temp);
    }, 1);

    // right side of the form
    setTimeout(() => {
      this.whatComponent = 'invoiceInput';
      temp = new InputDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 720;
      this.mousePositionY = this.canvasTop + 200;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'invoiceToLabel';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 575;
      this.mousePositionY = this.canvasTop + 210;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      temp = new DatepickerDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 720;
      this.mousePositionY = this.canvasTop + 250;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'shippingToLabel';
      temp = new LabelDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 580;
      this.mousePositionY = this.canvasTop + 250;
      this.componentList.push(temp);
    }, 1);

    //buttons
    setTimeout(() => {
      this.whatComponent = 'SearchButton';
      temp = new ButtonDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 900;
      this.mousePositionY = this.canvasTop + 500;
      this.componentList.push(temp);
    }, 1);
    setTimeout(() => {
      this.whatComponent = 'ClearButton';
      temp = new ButtonDragComponent(this.canvas);
      this.mousePositionX = this.canvasLeft + 965;
      this.mousePositionY = this.canvasTop + 500;
      this.componentList.push(temp);
    }, 1);
  }

  /*
  receiveMessage($event: boolean) {
    if ($event == true) {

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
        this.selected.draggable = false;
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

