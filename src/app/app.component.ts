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
import { DomSanitizer } from '@angular/platform-browser';
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

  selected: IProperty = {
    key: '',
    id: '',
    value: '',
    class: '',
    style: '',
    typeObj: '',
    type: '',
  };

  public _popupCount = 0;
  private _styleStart = '<style>';
  private _styleEnd = '</style>';
  private _styleBody = 'body{background-color:aquamarine;}';
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

  constructor(
    private renderer: Renderer2, 
    private drag: DragDrop, 
    private doms : DomSanitizer, 
    private http:HttpClient,
    public _router: Router,
    public _location: Location
    ) {}
  delete: boolean;

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

  /*
  readDocument() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
    }
    fileReader.readAsText(this.file);
  }
  */


  /*
  posts:any;

  getPosts(){
    this.posts = this.http.get('app/app.component.css')
      .subscribe(data => {
        console.log(data.toString);
    });
    console.log(this.posts);
    

    //readCSSFile(this.CSS_URL);
  }

  readCSSFile (url: any) {
    this.http.get(url)
      .subscribe(
        cssData => {
          console.log(cssData)
        },
        err => {
          console.log(err)
        });
   }

  /*
  readFileAsync(fileName: string): Promise<any> {
    return new Promise((resolve, reject) => {
        this.http.get('http://localhost:4200/assets/backStock.json')
            .subscribe(data => {
              resolve(data);
              return;
            });
    });
  }
  */

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
  
  cssReceiveMessage(event: any){
    let styleTemp = event.target.value;
    this.style = styleTemp.toString();
    /*
    this.http.get('/app/app.component.css').subscribe(data => {
      //console.log('data', data.toString());
      console.log(data.toString());
    });
    //this.getPosts();
    //console.log(this.style);
    
    /*const fs = 'fs';
    fs.readFile('./app.component.css', 'utf8', (err: any, data: any) => {
      if(err){
        console.log(err);
        return;
      }
      console.log(data);
      fs.writeFile('./app.component.css', data+"\n"+this.style, (err:any) =>{
        if(err){
          console.log(err);
          return;
        }
      })
    });
    */


    //File file = ResourceUtils 
    //var reader = new FileReader();
    //reader.readAsText(['./app.component.css'])
    //this.httpClient.get(['./app.component.css'], { responseType: 'text' })
    //.subscribe((data: any) => this.style = data);
  }

  
  

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

