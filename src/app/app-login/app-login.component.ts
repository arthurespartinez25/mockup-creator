import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})

export class AppLoginComponent implements OnInit {
  userID: number;
  loginUsername:string;
  loginPassword:string;
  sessionID:string;
  isEmpty:boolean;
  doesNotExist:boolean;
  users: any;
  title:string;
  
  @Output() loggingSession:EventEmitter<any> = new EventEmitter<any>();
  @Output() getUsername = new EventEmitter<string>();

  constructor(
    private loginCookie:CookieService,
    public _router: Router,
    private user:UsersService) { 
      
    }

  setLoginCookies(uname:string,pword:string){
    this.loginCookie.set("username",this.loginUsername);
    this.loginCookie.set("password",this.loginPassword);
    this.loginCookie.set("sessionID",this.sessionID);
    this.loginCookie.set("userID",this.userID.toString());
  }

  loggingIn(value: string) {
    this.loggingSession.emit(value);
  }

  ngOnInit() {
    this.user.getData().subscribe((data)=> {
      
      this.users = data;
    })
  }

  login(uname:string, pword: string){
    for (var i=0; i < this.users.length; i++) {
      if (this.users[i].UserName == uname && this.users[i].Password == pword){
        this.userID = this.users[i].UserID;
        this.loginUsername = this.users[i].UserName;
        this.loginPassword = this.users[i].Password;
        break;
      }
      else{
        
      }
    }
    if(uname==this.loginUsername&&pword==this.loginPassword){
      this.sessionID = "12345";
      this.setLoginCookies(uname,pword);
      this.loggingIn(this.sessionID);
      this.getUsername.emit(uname);
      
      this._router.navigateByUrl("/canvas");

      
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
