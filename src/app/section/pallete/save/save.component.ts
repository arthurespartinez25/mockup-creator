import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IComponent } from 'src/app/interfaces/icomponent';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit {

  @Input() componentListMap: Map<string, IComponent[]>;
  
  constructor(
    private loginCookie:CookieService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSave() {
    console.log(parseInt(this.loginCookie.get("userID")));
    console.log(this.componentListMap);
    this.dialog.open(SaveDataComponent);
  }

}

@Component({
  selector: 'app-save-data',
  templateUrl: './save.data.html'
})
export class SaveDataComponent {
  constructor(
    public dialogRef: MatDialogRef<SaveDataComponent>
  ) {}

  onCancelClick() {
    this.dialogRef.close();
  }
}