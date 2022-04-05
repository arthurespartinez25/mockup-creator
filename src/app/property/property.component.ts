import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IComponent } from '../interfaces/icomponent';
import { IProperty } from '../interfaces/iproperty';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common'
import { CodeComponent } from '../section/code/code.component';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css'],
})
export class PropertyComponent implements OnInit {
  props: IProperty;
  componentList: IComponent[] = [];
  selectedcomp: IComponent;
  defaultProps: IProperty = {
    key: '',
    id: '',
    value: '',
    class: '',
    style: '',
    typeObj: '',
    type: '',
    draggable: true,
    selected: false,
    mouseDragPositionX:0,
    mouseDragPositionY:0,
    dummyDate:''
  };
  style2 = '';
  @Output() addAllCSSRule = new EventEmitter<string>();
  @Output() clearCss = new EventEmitter<string>();
  @Output() cssReceiveMessage = new EventEmitter<string>();
  @Output() clearComponentListEvent = new EventEmitter<number>();
  @Output() updateComponentListEvent = new EventEmitter<IComponent[]>();

  @Input() get property(): IProperty {
    
    return this.props;
  }

  set property(value: IProperty) {
    if (value) {
      this.props = value;
      this.style2 = this.props.style;
      setTimeout(() => {
        let regexPosition = /position(.+?);/;
      let regexPosition2 = /top(.+?);/;
      let regexPosition3 = /left(.+?);/;
      this.style2 = this.style2.replace(regexPosition, '');
      this.style2 = this.style2.replace(regexPosition2, '');
      this.style2 = this.style2.replace(regexPosition3, '');
      if(this.props.typeObj == 'datepickerDrag')
        {
        this.props.dummyDate = this.datepipe.transform(this.props.value, 'MM/dd/YYYY');
        this.props.value = this.props.dummyDate.transform(this.props.value, 'YYYY/MM/dd');
         }
      }, 1);
      
    }
  }

  @Input() get compList() {
    return this.componentList;
  }
  set compList(value: IComponent[]) {
    this.componentList = value;
  }

  @Input() get selectedIdx() {
    return this.selectedcomp;
  }
  set selectedIdx(value: IComponent) {
    this.selectedcomp = value;
  }
  @Input() isPlaying: boolean;

  constructor(public sanitizer:DomSanitizer, public datepipe: DatePipe) {
    this.props = this.property;
    this.componentList = this.compList;
    this.selectedcomp = this.selectedIdx;
  }

  deleteComponent() {
    let componentIndex = this.componentList.indexOf(this.selectedcomp);
    if (componentIndex !== -1) {
      this.componentList.splice(componentIndex, 1);
      this.props = this.defaultProps;
      this.styleBox.nativeElement.value = "";
      this.props.draggable = false;
    }
    this.updateComponentListEvent.emit(this.componentList);
  }
  @ViewChild('taID') styleBox: ElementRef;
  clearComponent() {
        this.componentList.length = 0;
        this.props = this.defaultProps;
        this.styleBox.nativeElement.value = "";
        this.addAllCSSRule.next("");
        this.clearCss.next("");
        this.cssReceiveMessage.next("");
        this.props.draggable = false;        
        this.clearComponentListEvent.next(0);
  }

  ngOnInit(): void {
    this.style2 = this.props.style;
  }

  idChangeHandler(event: any) {
    this.props.id = event.target.value;
  }

  valueChangeHandler(event: any) {
    
    if(this.props.typeObj == 'datepickerDrag')
    {
      setTimeout(() => {
        this.props.value = this.datepipe.transform(event.target.value, 'yyyy-MM-dd');
        this.props.dummyDate = this.datepipe.transform(this.props.value, 'MM/dd/YYYY');
        
      }, 3000);
    }
    else
    {
      this.props.value = event.target.value;
    }
   
  }

  typeChangeHandler(event: any) {
    this.props.type = event.target.value;
  }

  styleChangeHandler(event: any) {
    let x = event.target.value;
    let regexPosition = /position(.+?);/;
    let regexPosition2 = /top(.+?);/;
    let regexPosition3 = /left(.+?);/;
    let position = 'position:sticky;';
    let position2 = this.props.style.match(regexPosition2);
    let position3 = this.props.style.match(regexPosition3);
    this.props.style = event.target.value+position+position2![0]+position3![0];
    
  }
  @ViewChild('taID') styleText!: ElementRef;
  styleChangeHandler2(event: any) {
    let regexPosition = /position(.+?);/;
    let regexPosition2 = /top(.+?);/;
    let regexPosition3 = /left(.+?);/;
    this.style2 = this.style2.replace(regexPosition, '');
    this.style2 = this.style2.replace(regexPosition2, '');
    this.style2 = this.style2.replace(regexPosition3, '');
  }

  classChangeHandler(event: any) {
    this.props.class = event.target.value;
  }

  contentChangeHandler(event: any) {
    this.props.content = event.target.value;
  }
  placeholderChangeHandler(event: any) {
    this.props.placeholder = event.target.value;
  }

  rowsChangeHandler(event: any) {
    this.props.rows = event.target.value;
  }

  colsChangeHandler(event: any) {
    this.props.cols = event.target.value;
  }
  
  hrefChangeHandler(event: any){
    this.props.href = event.target.value;
  }

  nameChangeHandler(event: any) {
    this.props.name = event.target.value;
  }
  linkValueChangeHandler(event: any) {
    this.props.linkValue = event.target.value;
  }
  checkedChangeHandler(event: any) {
    this.props.checked = event.target.value;
  }
  enableDragging(event: any) {
    this.props.draggable = !this.props.draggable;
  }
  redirectionChangeHandler(event: any) {
    this.props.redirection = event.target.value;
  }
  newTab(value: any) {
    this.props.target = !this.props.target;
  }
  
  /* CODE BELOW IS FOR TABLE ELEMENT */

  tblRowsChangeHandler(event: any) {
    this.props.tblRows = event.target.value;

    if (this.props.updateCallback) {
      const { updateCallback } = this.props;
      updateCallback(this.props.tblRows, this.props.tblCols);
    }
  }
  tblColsChangeHandler(event: any) {
    this.props.tblCols = event.target.value;
    if (this.props.updateCallback) {
      const { updateCallback } = this.props;
      updateCallback(this.props.tblRows, this.props.tblCols);
    }
  }
  updateLink()
  {
       let regexPosition = /https(.+?)"/;
       let link:any = null;
       let dummyLink = this.props.value;
       var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
       if(dummyLink.charAt(dummyLink.length - 1) == ">")
       {
        link = this.props.value.match(regexPosition);
        link[0] = link[0].slice(0, -1); 
        this.props.value = link[0];
        this.props.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.props.value);
      }
      else if(dummyLink[0]?.charAt(dummyLink[0].length - 1) == '"')
      {
        this.props.value = this.props.value.slice(0, -1); 
        this.props.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.props.value);
      }
     else if(this.props.value.match(p))
      {
        this.props.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.props.value);
       }  
    else
      {
        this.props.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://ps.w.org/all-404-redirect-to-homepage/assets/icon-128x128.png?rev=1515215');
      }
  }
  /* END OF CODE FOR TABLE ELEMENT */
}
