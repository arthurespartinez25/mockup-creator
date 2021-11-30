import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDrag, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor() { }

  panget = 
  [
    'Huebert'
  ];
  
  ngOnInit(): void {
  }

}
