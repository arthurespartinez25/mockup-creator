import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
/*
import { CanvasComponent } from './canvas/canvas.component';
import { WindowPaletteComponent } from './window_palette/window_palette.component';
*/

@Component({
  selector: 'UI-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class UIWindowComponent implements OnInit {

  @Input() addedPallete: any[]=[];

  constructor(private sharedService:SharedService) { }

  ngOnInit(): void {
  }
}
