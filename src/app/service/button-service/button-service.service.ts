import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {

  private listener = new Subject<string>();

  listen(): Observable<string> {
    return this.listener.asObservable();
  }

  passCanvasName(name: string) {
    this.listener.next(name);
  }
}
