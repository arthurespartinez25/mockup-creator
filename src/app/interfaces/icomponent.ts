import { ElementRef } from '@angular/core';
import { IProperty } from './iproperty';

export interface IComponent {
  canvas: ElementRef;
  props: IProperty;
  get htmlCode(): string;
  

}
