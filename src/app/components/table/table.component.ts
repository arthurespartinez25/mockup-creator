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
    this.tblRowsArray = [];
    this.tblColsArray = [];
    if (!row || !col) {
      console.warn('rows or columns are undefined');
    } else {
      for (var i = 0; i < row; i++) {
        this.tblRowsArray.push([]);
      }
      for (var i = 0; i < col; i++) {
        this.tblColsArray.push(i);
      }
      //////////////////////////////////////////////

      for (var i = 0; i < row; i++) {
        for (var j = this.tblRowsArray[i].length; j < col; j++) {
          this.tblRowsArray[i].push('data' + i + j);
        }
        //console.log(this.tblRowsArray[i].toString());
      }
      //console.log(this.tblColsArray.toString());}
    }
    console.log(this.tblColsArray.length);
  };

  editTableValue = (row, col, oldvalue:string, newValue:string) => {
    console.log("This is cell position " + row + "," + col + "\nThis is the previous Value " + oldvalue + "\nThis is the new" + newValue);
    this.tblRowsArray[row][col] = newValue;
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
    value: 'TableName',
    class: 'table',
    style: 'position:absolute;left:0px;top:0px;',
    typeObj: 'table',
    type: '',
    tblCols: 5,
    tblRows: 3,
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
