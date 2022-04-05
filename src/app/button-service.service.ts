import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {

  private listener = new Subject<number>();

  listen(): Observable<any> {
    return this.listener.asObservable();
  }

  passCanvasName(name: number) {
    this.listener.next(name);
  }
}
