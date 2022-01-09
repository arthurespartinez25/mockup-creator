import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import {
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IComponent } from 'src/app/interfaces/icomponent';
import { IProperty } from 'src/app/interfaces/iproperty';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, IComponent {
  canvas: ElementRef;
  ref: ChangeDetectorRef;
  value = '';

  editTableDimension = (row, col) => {
    //let col = this.tblCols;
    //let row = this.tblRows;
    //this.tblRowsArray = [];
    //this.tblColsArray = [];
    this.props.tblArrayRow = [];
    this.props.tblArrayCol= [];
    if (!row || !col) {
      console.warn('rows or columns are undefined');
    } else {
      for (var i = 0; i < row; i++) {
        //this.tblRowsArray.push([]);
        this.props.tblArrayRow.push([]);
      }
      for (var i = 0; i < col; i++) {
        //this.tblColsArray.push(i);
        this.props.tblArrayCol.push(i);
      }
      //////////////////////////////////////////////

      for (var i = 0; i < row; i++) {
        for (var j = this.props.tblArrayRow[i].length; j < col; j++) {
          //this.tblRowsArray[i].push('data' + i + j);
          this.props.tblArrayRow[i].push('data \"' + i + ':'+ j + '\"');
        }
        //console.log(this.tblRowsArray[i].toString());
      }
      //console.log(this.tblColsArray.toString());}
    }
    //console.log(this.tblColsArray.length);
    console.log(this.props.tblArrayCol.length);
  };

  getCellPosition = (row:number, col:number, oldvalue:string) => {
    this.previousVal = this.props.value;
    if(this.currentRow == row && this.currentCol == col){
      console.log("You selected a the same cell");
      //this.props.value = oldvalue;
      this.tblRowsArray[row][col] = "";
      this.props.tblArrayRow[row][col] = "";
    }
    else{
      console.log(
        "You selected a different cell"+
        "\nPrevious Cell Position: "+ this.currentRow + "," + this.currentCol +
        "\nあたらしい Cell Position: "+ row + col +
        "\nしりょう: " + oldvalue
      );
      //this.props.value = oldvalue;
      this.tblRowsArray[row][col] = "";
      this.props.tblArrayRow[row][col] = "";
    }
    console.log("This is the data: " + this.previousVal);
    this.props.tblArrayRow[row][col] = this.props.value;
    this.tblRowsArray[row][col] = this.previousVal;
    this.currentRow = row;
    this.currentCol = col;
    this.currentVal = this.previousVal;
  }

  
  editTableValue = (row, col, oldvalue:string, newValue:string) => {
    console.log("This is cell position " + row + "," + col + "\nThis is the previous Value: " + oldvalue + "\nThis is the new Value: " + newValue);
    //this.tblRowsArray[row][col] = newValue;
    this.props.tblArrayRow[row][col] = newValue;
  }
  

  rerender() {
    this.value = '___temp____';
    console.log('tangina mooooo');
    this.ref.detectChanges;
    this.value = '';
  }

  props: IProperty = {
    key: '',
    id: '',
    value: '',
    class: 'table',
    style: 'position:absolute;left:0px;top:0px;',
    typeObj: 'table',
    type: '',
    tblCols: 5,
    tblRows: 3,
    tblArrayCol:[],
    tblArrayRow:[],
    updateCallback: this.editTableDimension,
  };

  @Output() updateDataEvent = new EventEmitter<any>();
  @Output() updateDataEventY = new EventEmitter<any>();
  @Input() xcanvas: any;
  @Input() ycanvas: any;
  mousePositionXV2 = 310;
  mousePositionYV2 = 110;
  theX = 0;
  theY = 0;
  tblCols = this.props.tblCols;
  tblRows = this.props.tblRows;
  tblColsArray: any = [];
  tblRowsArray: any = [];
  currentRow: number;
  currentCol: number;
  currentVal: string = "";
  previousVal: string = "";

  ngOnInit(): void {
    //this.drag.createDrag(this.ref).withBoundaryElement(this.canvas);
    this.theX = this.xcanvas;
    this.theY = this.ycanvas;
  }

  onDragEnded($event: any) {
    this.mousePositionXV2 = $event.source.getFreeDragPosition().x;
    this.mousePositionYV2 = $event.source.getFreeDragPosition().y;

    this.updateDataEvent.emit(this.mousePositionXV2);
    this.updateDataEventY.emit(this.mousePositionYV2);
  }

  constructor(canvas: ElementRef, changeDetectorRef: ChangeDetectorRef) {
    this.ref = changeDetectorRef;
    this.canvas = canvas;
    let date = Date.now();
    this.props.key = date.toString();
    this.props.id = 'table' + date.toString();
  }

  @Input() get property(): IProperty {
    return this.props;
  }

  set property(value: IProperty) {
    if (value) {
      this.props = value;
      this.tblCols = value.tblCols;
      this.tblRows = value.tblRows;
      this.props.tblArrayRow = this.tblRowsArray;
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

  get htmlCode(): string {
    let tmpHtmlCode = '<div';
    tmpHtmlCode +=
      ' id="' + this.props.id + '" style="' + this.props.type + '">';
    tmpHtmlCode += '\n' + '<table class="' + this.props.class + '">';

    tmpHtmlCode += '\n' + '<thead>';
    tmpHtmlCode += '\n' + '<tr>';
    tmpHtmlCode += '\n' + '<th scope="col">#</th>';
    tmpHtmlCode += '\n' + '<th scope="col">Heading 1</th>';
    tmpHtmlCode += '\n' + '<th scope="col">Heading 2</th>';
    tmpHtmlCode += '\n' + '<th scope="col">Heading 3</th>';
    tmpHtmlCode += '\n' + '</tr>';
    tmpHtmlCode += '\n' + '</thead>';

    tmpHtmlCode += '\n' + '<tbody>';

    tmpHtmlCode += '\n' + '<tr>';
    tmpHtmlCode += '\n' + '<th scope="row">1</th>';
    tmpHtmlCode += '\n' + '<td>Cell</td>';
    tmpHtmlCode += '\n' + '<td>Cell</td>';
    tmpHtmlCode += '\n' + '<td>Cell</td>';
    tmpHtmlCode += '\n' + '</tr>';

    tmpHtmlCode += '\n' + '<tr>';
    tmpHtmlCode += '\n' + '<th scope="row">2</th>';
    tmpHtmlCode += '\n' + '<td>Cell</td>';
    tmpHtmlCode += '\n' + '<td>Cell</td>';
    tmpHtmlCode += '\n' + '<td>Cell</td>';
    tmpHtmlCode += '\n' + '</tr>';

    tmpHtmlCode += '\n' + '<tr>';
    tmpHtmlCode += '\n' + '<th scope="row">3</th>';
    tmpHtmlCode += '\n' + '<td>Cell</td>';
    tmpHtmlCode += '\n' + '<td>Cell</td>';
    tmpHtmlCode += '\n' + '<td>Cell</td>';
    tmpHtmlCode += '\n' + '</tr>';

    tmpHtmlCode += '\n' + '</tbody>';
    tmpHtmlCode += '\n' + '</table>';

    tmpHtmlCode += '\n' + ' </div>';

    return tmpHtmlCode;
  }
}
