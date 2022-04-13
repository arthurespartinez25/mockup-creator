import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClearComponentsService {

  private listener = new Subject<any>();

  listen(): Observable<any> {
    return this.listener.asObservable();
  }

  clearComponents() {
    this.listener.next(0);
  }
}
