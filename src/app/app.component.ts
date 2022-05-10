import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.palette.component.css'],
})
export class AppComponent implements OnInit {
  title = 'mockup-creator';
  constructor(
    private loginCookie:CookieService,
    public _router: Router
  ) {}
  sessionID = this.loginCookie.get("sessionID");

  ngOnInit() {
    // if(this.sessionID) {
    //   this._router.navigateByUrl("/canvas");
    // }
  }
  
}