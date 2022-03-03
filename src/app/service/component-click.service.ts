import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ComponentClickService {
    private subject = new Subject<any>();
    
    setID(value: string) {
        this.subject.next({id: value})
    }

    getID(): Observable<any> {
        return this.subject.asObservable();
    }
}