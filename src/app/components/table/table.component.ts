import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, IComponent  {
  canvas: ElementRef;
  props: IProperty = {
    key: '',
    id: '',
    value: '',
    class: 'table',
    style: 'position:absolute;left:0px;top:0px;',
    typeObj: 'table',
    type: '',
    tblRows: 4,
    tblCols: 4,
  };

  @Output() updateDataEvent= new EventEmitter<any>();
  @Output() updateDataEventY= new EventEmitter<any>();
  @Input() xcanvas: any;
  @Input() ycanvas: any;
  mousePositionXV2 = 310;
  mousePositionYV2= 110;
  theX = 0;
  theY = 0;
  tblRows = 4;
  tblCols = 4;
  tblColsArray : any = [];
  tblRowsArray : any = [];

  ngOnInit(): void {
    //this.drag.createDrag(this.ref).withBoundaryElement(this.canvas);
    this.theX = this.xcanvas;
    this.theY = this.ycanvas;
  }

  onDragEnded($event: any){
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;
    
    this.updateDataEvent.emit(this.mousePositionXV2);
    this.updateDataEventY.emit(this.mousePositionYV2);
  }

  constructor(canvas: ElementRef) {
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'table' + date.toString();
    
    /*
    for(let i=0; i<=this.tblRows; i++){
      for(let j=0; j<=this.tblCols; j++){
        if (i == 0){
          if (j == 0){
          this.tblRowsArray[i][j] = "#";
          }
          else{
            this.tblRowsArray[i][j] = "Head" + (i+1).toString();
          }
        }
        else{
          this.tblRowsArray[i][j] = "value";
        }
      }
    }
    console.log(this.tblRowsArray[this.tblRowsArray.length].toString());
    */
   }
  
   @Input() get property(): IProperty {
    return this.props;
  }

  set property(value: IProperty) {
    if (value) {
      this.props = value;
    }
  }

  get htmlCode(): string {
    let tmpHtmlCode = '<div';
    tmpHtmlCode += ' id="' + this.props.id + '" style="' + this.props.type +  '">';
    tmpHtmlCode += "\n" + '<table class="' + this.props.class + '">';

    tmpHtmlCode += "\n" + '<thead>';
    tmpHtmlCode += "\n" + '<tr>';
    tmpHtmlCode += "\n" + '<th scope="col">#</th>';
    tmpHtmlCode += "\n" + '<th scope="col">Heading 1</th>';
    tmpHtmlCode += "\n" + '<th scope="col">Heading 2</th>';
    tmpHtmlCode += "\n" + '<th scope="col">Heading 3</th>';
    tmpHtmlCode += "\n" + '</tr>';
    tmpHtmlCode += "\n" + '</thead>';

    tmpHtmlCode += "\n" + '<tbody>';

    tmpHtmlCode += "\n" + '<tr>';
    tmpHtmlCode += "\n" + '<th scope="row">1</th>';
    tmpHtmlCode += "\n" + '<td>Cell</td>';
    tmpHtmlCode += "\n" + '<td>Cell</td>';
    tmpHtmlCode += "\n" + '<td>Cell</td>';
    tmpHtmlCode += "\n" + '</tr>';

    tmpHtmlCode += "\n" + '<tr>';
    tmpHtmlCode += "\n" + '<th scope="row">2</th>';
    tmpHtmlCode += "\n" + '<td>Cell</td>';
    tmpHtmlCode += "\n" + '<td>Cell</td>';
    tmpHtmlCode += "\n" + '<td>Cell</td>';
    tmpHtmlCode += "\n" + '</tr>';

    tmpHtmlCode += "\n" + '<tr>';
    tmpHtmlCode += "\n" + '<th scope="row">3</th>';
    tmpHtmlCode += "\n" + '<td>Cell</td>';
    tmpHtmlCode += "\n" + '<td>Cell</td>';
    tmpHtmlCode += "\n" + '<td>Cell</td>';
    tmpHtmlCode += "\n" + '</tr>';

    tmpHtmlCode += "\n" + '</tbody>';
    tmpHtmlCode += "\n" + '</table>';
    
    tmpHtmlCode +="\n" + ' </div>';
    
  
    return tmpHtmlCode;
  }

}
