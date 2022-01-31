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
  inSession:boolean;
  message="tanga";
  
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  @Output() loginSession: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  onClicked() {
    this.notify.emit(this.message);
  }

  ngOnInit(): void {
    this.inSession = false;
  }

  login(uname:string, pword: string){
    this.loginUsername = 'sample';
    this.loginPassword = 'sample';
    if(uname==this.loginUsername&&pword==this.loginPassword){
      this.inSession = true;
      this.loginSession.emit(this.inSession)
      console.log(this.inSession);
      console.log("Correct Username and Password");
    }
    else{
      console.log("Wrong Username and Password");
    }
  }

}
