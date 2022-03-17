import { Component, Inject, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IComponent } from 'src/app/interfaces/icomponent';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsersService } from '../../../service/users.service';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit {

  @Input() componentListMap: Map<string, IComponent[]>;
  
  constructor(
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSave() {
    console.log(this.componentListMap);
    this.dialog.open(SaveDataComponent, {
      data: {
        value: this.componentListMap
      }
    });
  }
}

@Component({
  selector: 'app-save-data',
  templateUrl: './save.data.html'
})
export class SaveDataComponent {
  saveName: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loginCookie:CookieService,
    public dialogRef: MatDialogRef<SaveDataComponent>,
    public _router: Router,
    private service: UsersService
  ) {}

  ngOnInit(): void {
  }

  onCancelClick() { //closes dialog box
    this.dialogRef.close();
  }

  onSaveClick(value: string) {
    let id = {
      userID: this.loginCookie.get("userID")
    }
    this.service.getSaveTotal(id).subscribe(res => {
      let projID = "user" + this.loginCookie.get("userID") + "_proj" + (Object.values(res)[0] + 1);
      let val = { 
        userID: parseInt(this.loginCookie.get("userID")),
        projectName: value,
        projectID: projID
      }

      this.service.saveData(val).subscribe(res=> {
        console.log(res.toString());
      });
    });
  }
}