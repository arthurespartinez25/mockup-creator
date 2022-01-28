import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})

export class AppLoginComponent implements OnInit {
  loginUsername:string;
  loginPassword:string;
  public inSession:boolean;
  
  @Output() loggingSession = new EventEmitter<any>();

  constructor() { }

  loggingIn(value: any) {
    this.loggingSession.emit(value);
    console.log("umabot ako dito, eto value ko:" + value);
  }

  ngOnInit(): void {
    this.inSession = false;
  }

  login(uname:string, pword: string){
    this.loginUsername = 'sample';
    this.loginPassword = 'sample';
    if(uname==this.loginUsername&&pword==this.loginPassword){
      this.inSession = true;
      this.loggingIn(this.inSession);
      console.log("Correct Username and Password");
    }
    else{
      console.log("Wrong Username and Password");
    }
  }

}
