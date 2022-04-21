import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {
  userId: number;
  projects: any;

  constructor(private loginCookie:CookieService,
    public dialog: MatDialog,
    public _router: Router,) { }

  ngOnInit(): void {
  }
}
