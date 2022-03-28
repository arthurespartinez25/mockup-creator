import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CrossComponentBridge {
    private subject = new Subject<any>();
    
    setValue(value: number) {
        this.subject.next({value : value})
    }

    getValue(): Observable<any> {
        return this.subject.asObservable();
    }
}
