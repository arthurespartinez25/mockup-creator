import { ElementRef } from '@angular/core';
import { IProperty } from './iproperty';

export interface IComponent {
  canvas: ElementRef;
  props: IProperty;
  get htmlCode(): string;
}
export const defaultProps = {
  key: '',
  id: '',
  value: '',
  class: '',
  style: '',
  typeObj: '',
  type: '',
  draggable: false,
  selected : false,
  hidden: false,
  mouseDragPositionX: 0,
  mouseDragPositionY: 0,
  finalStyle:'',
  isSavedComponent: false
}