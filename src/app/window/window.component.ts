import { Component, OnInit, Input, Output } from '@angular/core';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'UI-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class UIWindowComponent implements OnInit {

  @Input() addedPallete: any[]=[];
  @Output() addToCanvas: any[]=[];

  constructor(private sharedService:SharedService) { }

  ngOnInit(): void {
  }
}
