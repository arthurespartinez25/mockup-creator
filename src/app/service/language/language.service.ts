import { Injectable } from '@angular/core';

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
