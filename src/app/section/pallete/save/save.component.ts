import { Component, Inject, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IComponent } from 'src/app/interfaces/icomponent';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsersService } from '../../../service/users.service';
import { FormControl } from '@angular/forms';

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
    this.dialog.open(SaveDataComponent, {
      data: {
        value: this.componentListMap
      }
    });
  }
}

@Component({
  selector: 'app-save-data',
  templateUrl: './save.data.html',
  styleUrls: ['./save.component.css']
})
export class SaveDataComponent {
  saveName: string;
  componentListMap: Map<string, IComponent[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loginCookie:CookieService,
    public dialogRef: MatDialogRef<SaveDataComponent>,
    public _router: Router,
    private service: UsersService
  ) {
    this.componentListMap = data.value;
  }

  ngOnInit(): void {
    this.saveName = "Project";
  }

  onCancelClick() { //closes dialog box
    this.dialogRef.close();
  }

  onSaveClick(value: string) {
    let id = { //saves project to database
      userID: this.loginCookie.get("userID")
    }
    this.service.getSaveTotal(id).subscribe(res => {
      let projID = "user" + this.loginCookie.get("userID") + "_proj" + (Object.values(res)[0] + 1);
      let projVal = { 
        userID: parseInt(this.loginCookie.get("userID")),
        projectName: value,
        projectID: projID
      }

      this.service.saveData(projVal).subscribe(res=> {
        //console.log(res.toString());
        console.log(this.componentListMap);
        let keys: string[] = [];
        let canvasNames: string[] = [];

        for (let key of this.componentListMap.keys()) {
          keys.push(projID + "_" + key);
        }

        for (let i = 0; i < keys.length; i++) { //temporary canvas names until tabs can be renamed. Once possible, remove this for-loop
          canvasNames.push("Canvas " + (i + 1));//and fetch the data from the tab names instead
        }

        let tabVal = {
          canvasKeys: keys,
          canvasNames: canvasNames
        }

        this.service.saveTabData(tabVal).subscribe(res=> {
          console.log(res.toString());
        });
      });
    });
  }
}