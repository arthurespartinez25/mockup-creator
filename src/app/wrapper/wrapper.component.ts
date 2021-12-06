import { Component, Input, OnInit } from '@angular/core';
import { IComponent } from '../interfaces/icomponent';
import { IProperty } from '../interfaces/iproperty';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
})
export class WrapperComponent implements OnInit {
  child: IComponent;

  @Input() get childComp(): IComponent {
    return this.child;
  }

  set childComp(value: IComponent) {
    if (value) {
      this.child = value;
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
