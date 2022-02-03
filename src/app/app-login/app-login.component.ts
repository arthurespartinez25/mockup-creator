import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})

export class AppLoginComponent implements OnInit {
  loginUsername:string;
  loginPassword:string;
  sessionID:string;
  isEmpty:boolean;
  doesNotExist:boolean;
  
  @Output() loggingSession:EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private loginCookie:CookieService,
    public _router: Router) { }

  setLoginCookies(uname:string,pword:string){
    this.loginCookie.set("username",this.loginUsername);
    this.loginCookie.set("password",this.loginPassword);
    this.loginCookie.set("sessionID",this.sessionID);
    console.log(uname + " and " + pword);
  }

  loggingIn(value: string) {
    this.loggingSession.emit(value);
    console.log("umabot ako dito, eto value ko:" + value);
  }

  ngOnInit(): void {
  }

  login(uname:string, pword: string){
    this.loginUsername = 'sample';
    this.loginPassword = 'sample';
    if(uname==this.loginUsername&&pword==this.loginPassword){
      this.sessionID = "12345";
      this.setLoginCookies(uname,pword);
      this.loggingIn(this.sessionID);
      
      this._router.navigateByUrl("/canvas");

      console.log("Correct Username and Password");
    }
    else if(uname==""||pword==""){
      this.doesNotExist=false;
      this.isEmpty=true;
    }
    else{
      this.isEmpty=false;
      this.doesNotExist=true;
    }
  }

  register(){
    this._router.navigateByUrl("/register");
  }

}
