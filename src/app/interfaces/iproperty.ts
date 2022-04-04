import { SafeResourceUrl } from '@angular/platform-browser';
export interface IProperty {
  key: string;
  id: string;
  value: any;
  class: string;
  style: string;
  typeObj: string;
  type: string;
  content?: string;
  placeholder?: string;
  rows?: number;
  cols?: number;
  name?: string;
  href?:string;
  link1?: string;
  link2?: string;
  link3?: string;
  checked?: string;
  draggable?: boolean;
  hidden?: boolean;
  tblRows?: number;
  tblCols?: number;
  tblArrayRow?: any;
  tblArrayCol?: any;
  tblContent?: [][];
  links?: number;
  linksArray?: any;
  linkValue?: any;
  linkContent?: [];
  updateCallback?: (row, col) => void;
  url?: SafeResourceUrl;
  selected: boolean;
  mouseDragPositionX?: any;
  mouseDragPositionY?: any;
  dummystyle?:any;
  dummyDate?:any;
 
}
