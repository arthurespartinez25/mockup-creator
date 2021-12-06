import { IProperty } from './iproperty';

export interface IComponent {
  props: IProperty;
  get htmlCode(): string;
}
