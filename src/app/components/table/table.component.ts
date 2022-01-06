import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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
    value: 'TableName',
    class: 'table',
    style: 'position:absolute;left:0px;top:0px;',
    typeObj: 'table',
    type: '',
    tblCols:7,
    tblRows:3
  };

  x = true;
  @Input() show: any;
  show2: boolean;
  @Output() updateDataEvent= new EventEmitter<any>();
  @Output() updateDataEventY= new EventEmitter<any>();
  @Input() xcanvas: any;
  @Input() ycanvas: any;
  mousePositionXV2 = 310;
  mousePositionYV2= 110;
  theX = 0;
  theY = 0;
  tblCols = this.props.tblCols;
  tblRows = this.props.tblRows;
  tblColsArray : any = [];
  tblRowsArray : any = [];
  numbers: number[];

  ngOnInit(): void {
    //this.drag.createDrag(this.ref).withBoundaryElement(this.canvas);
    this.theX = this.xcanvas;
    this.theY = this.ycanvas;
    this.show2 = this.show;
    console.log(this.show2);
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

    this.numbers = Array(this.tblCols).fill(0).map((x,i)=>i);
    console.log(this.show);
   }
  
  @Input() get property(): IProperty {
    
    return this.props;
  }

  set property(value: IProperty) {
    if (value) {
      this.props = value;
      this.tblCols = value.tblCols;
      this.tblRows = value.tblRows;
      this.editTableDimension(this.tblRows, this.tblCols);
    }
    //console.log("Repeato Shimashou");
    //this.editTableDimension();
  }
  /*
  set row(row:number){
    this.props.tblRows = row;
  }
  set col(col:number){
    this.props.tblCols = col;
  }
  */

  editTableDimension(row,col){
    //let col = this.tblCols;
    //let row = this.tblRows;
    this.tblRowsArray = [];
    this.tblColsArray = [];
    if (!row || !col){
      console.warn("rows or columns are undefined");
    }else{
      for( var i=0; i<row; i++ ) {
        this.tblRowsArray.push( [] );
      }
      for( var i=0; i<col; i++ ) {
        this.tblColsArray.push(i);
      }
      //////////////////////////////////////////////
  
      for (var i = 0; i < row; i++)
      {
        for (var j = this.tblRowsArray[i].length; j < col; j++)
        {
          this.tblRowsArray[i].push("data");
        }
        //console.log(this.tblRowsArray[i].toString());
      }
      //console.log(this.tblColsArray.toString());}
    }
  }

  get htmlCode(): string {
    var x=0;
    let tmpHtmlCode = '<div';
    tmpHtmlCode += ' id="' + this.props.id + '" style="' + this.props.type +  '">';
    tmpHtmlCode += "\n" + '<table class="' + this.props.class + '">';

    while(x<Number(this.props.tblCols)) {
      tmpHtmlCode += "\n" + this.props.tblCols;
      x++;
    }

    /* tmpHtmlCode += "\n" + '<thead>';
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

    tmpHtmlCode += "\n" + '</tbody>'; */
    tmpHtmlCode += "\n" + '</table>';
    
    tmpHtmlCode +="\n" + ' </div>';
    
  
    return tmpHtmlCode;
  }

}
