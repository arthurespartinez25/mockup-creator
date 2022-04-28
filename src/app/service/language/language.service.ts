import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { en } from 'src/app/resource/message/en';
import { ja } from 'src/app/resource/message/ja';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selectedLangugae: any;
  constructor() { }
  setLanguage(data:any){
    this.selectedLangugae = data;
  }
  getLanguage(){
    return this.selectedLangugae;
  }
}
