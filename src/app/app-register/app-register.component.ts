import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../service/users/users.service';

@Component({
  selector: 'app-app-register',
  templateUrl: './app-register.component.html',
  styleUrls: ['./app-register.component.css']
})
export class AppRegisterComponent implements OnInit {

  constructor(private service:UsersService,
    public _router: Router,) { }

  ngOnInit(): void {
  }

  users: any;
  userExists: boolean;

  register(username, password, cpassword, email, firstName, lastName) {
    

    if(password != cpassword){
      alert("Passwords do not match");
      return;
    }

    this.service.getData().subscribe((data)=> {
      
      this.users = data;

      for (var i=0; i < this.users.length; i++) {
        if (this.users[i].UserName == username){
          alert("Username already taken");
          return;
        }
        if (this.users[i].Email == email){
          alert("Email already registered");
          return;
        }
      }

      var val = { 
        username:username,
        password:password,
        fname:firstName,
        lname:lastName,
        email:email,
      }
      this.service.postData(val).subscribe(res=> {
        /* alert(res.toString()); */
        this._router.navigateByUrl("/login");
      });
    })

    
  }
  login(){
    
  }
}
