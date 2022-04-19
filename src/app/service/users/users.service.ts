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
    
    switch(type) { //code can be simplified by removing the switch-case and directly passing the route instead
      case "project":
        url="http://localhost:8000/save"; //^above comment cont.: ex. url="http://localhost:8000/"+type; -"el gwapo"
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
      case "previousState":
        url="http://localhost:8000/previousState";
        break;
      case "tableContent":
        url="http://localhost:8000/tableContent";
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