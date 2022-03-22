import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getData() {
    let url="http://localhost:8000";
    return this.http.get(url);
  }

  postData(datas:any) {
    let url="http://localhost:8000/register";
    return this.http.post(url, datas);
  }

  saveData(datas:any, type: string) {
    let url = '';
    
    switch(type) {
      case "project":
        url="http://localhost:8000/save";
        break;
      case "tab":
        url="http://localhost:8000/saveTabs";
        break;
      case "components":
        url="http://localhost:8000/saveComponents";
        break;
      case "css":
        url="http://localhost:8000/saveCss";
        break;
    }

    return this.http.post(url, datas);
  }

  getSaveTotal(datas: any) {
    let url="http://localhost:8000/total/"+datas.userID;
    return this.http.get(url);
  }

  /*saveTabData(datas: any) {
    console.log(datas);
    let url="http://localhost:8000/saveTabs";
    return this.http.post(url, datas);
  }*/
}
