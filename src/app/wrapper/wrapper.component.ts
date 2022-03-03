import { DragDrop } from '@angular/cdk/drag-drop';
import { Icu } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription, throwError } from 'rxjs';
import { IComponent } from '../interfaces/icomponent';
import { IPosition } from '../interfaces/iposition';
import { IProperty } from '../interfaces/iproperty';
import { ComponentClickService } from '../service/component-click.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
})
export class WrapperComponent implements OnInit {
  child: IComponent;
  canvas: ElementRef;
  compList: IComponent[] = [];
  canvasWidth: string;
  subscription: Subscription;

  @Input() mousePositionX: any;
  @Input() mousePositionY: any;
  @Input() canvasLeft: any;
  @Input() canvasTop: any;
  @Input() canvasW: any;
  @Input() whatComponent:any;
  @Input() pixelPosition: IPosition[] = [];

  @Output() updatePixelPositionEvent = new EventEmitter<IPosition[]>();

  index = 0;
  mousePositionX2 = 0;
  mousePositionY2 = 0;
  initPosX = 0;
  initPosY = 0;
  pixelPosX = 0;
  pixelPosY = 0;
  canvasPositionX = 0;
  canvasPositionY = 0;
  canvasWidth2 = 0;
  whatComponent2 = "";


  @Input() get childComp(): IComponent {
    return this.child;
  }

  set childComp(value: IComponent) {
    if (value) {
      this.child = value;
    }
  }

  @Input() get canvasRef(): ElementRef {
    return this.canvas;
  }

  set canvasRef(value: ElementRef) {
    this.canvas = value;
    this.canvasWidth = getComputedStyle(this.canvas.nativeElement).width;
  }

  @Input()get componentList(): IComponent[]{
    return this.compList;
  }

  set componentList(value: IComponent[]){
    this.compList = value;
  }

  constructor(
    private ref: ElementRef, 
    private drag: DragDrop,
    private componentClick: ComponentClickService
    ) {
      this.subscription = this.componentClick.getID().subscribe(id => {
        if (id) {
          this.index = this.pixelPosition.map(object => object.key).indexOf(id.id);
          this.initPosX = this.pixelPosition[this.index].pos.pixelPositionX!;
          this.initPosY = this.pixelPosition[this.index].pos.pixelPositionY!;
        }
      })
    }
  stylish ={};
  ngOnInit(): void {
    this.mousePositionX2 = this.mousePositionX;
    this.mousePositionY2 = this.mousePositionY;
    this.canvasPositionX = this.canvasLeft;
    this.canvasPositionY = this.canvasTop;
    this.canvasWidth2 = this.canvasW;
    this.whatComponent2 = this.whatComponent;
  }
  updatePixelPosition(value: IPosition[]) {
    this.updatePixelPositionEvent.emit(value);
  }
}
