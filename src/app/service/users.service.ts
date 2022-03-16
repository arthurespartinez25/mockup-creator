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

  saveData(datas:any) {
    let url="http://localhost:8000/save";
    return this.http.post(url, datas);
  }
}
