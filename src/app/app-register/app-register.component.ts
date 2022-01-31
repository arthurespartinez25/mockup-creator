import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-register',
  templateUrl: './app-register.component.html',
  styleUrls: ['./app-register.component.css']
})
export class AppRegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  register(username, password, cpassword, email, firstName, lastName) {
    if(password != cpassword){
      alert("mali ang password mo wag ka na mag register tanga");
      return;
    }
  }
  login(){}
}
