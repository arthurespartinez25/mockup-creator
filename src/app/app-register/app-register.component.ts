import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-app-register',
  templateUrl: './app-register.component.html',
  styleUrls: ['./app-register.component.css']
})
export class AppRegisterComponent implements OnInit {

  constructor(private service:UsersService) { }

  ngOnInit(): void {
  }
  register(userid, username, password, cpassword, email, firstName, lastName) {
    if(password != cpassword){
      alert("Passwords do not match");
      return;
    }
    var val = { 
      userID:userid,
      username:username,
      password:password,
      fname:firstName,
      lname:lastName,
      email:email,
    }
    this.service.postData(val).subscribe(res=> {
      alert(res.toString());
    });
  }
  login(){
    
  }
}
