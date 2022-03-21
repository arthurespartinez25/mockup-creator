import { Component, Inject, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IComponent } from 'src/app/interfaces/icomponent';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsersService } from '../../../service/users.service';
import { FormControl } from '@angular/forms';
import { map, zip } from 'rxjs';

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
    let id = { //fetch the current user's user id
      userID: this.loginCookie.get("userID")
    }

    this.service.getSaveTotal(id).subscribe(res => { //gets the total projects the user has saved under the account
      let projID = "user" + this.loginCookie.get("userID") + "_proj" + (Object.values(res)[0] + 1);
      let projVal = { 
        userID: parseInt(this.loginCookie.get("userID")),
        projectName: value,
        projectID: projID
      }

      this.service.saveData(projVal, "project").subscribe(res=> { //saves the project to projects_table
        let keys: string[] = [];
        let nativeKeys: string[] = [];
        let canvasNames: string[] = [];

        for (let key of this.componentListMap.keys()) {
          nativeKeys.push(key);
          keys.push(projID + "_" + key);
        }

        for (let i = 0; i < keys.length; i++) { //temporary canvas names until tabs can be renamed. Once possible, remove this for-loop
          canvasNames.push("Canvas " + (i + 1));//and fetch the data from the tab names instead
        }

        let tabVal = {
          canvasKeys: keys,
          canvasNames: canvasNames
        }

        this.service.saveData(tabVal, "tab").subscribe(res=> { //saves the tab details to tab_table
          let tabSort = {};
          /*****
           * The for-loop below is a manual conversion to JSON. We commonly use Iterate and Stringify method, or the ES6 fromEntries method
           * when we want to convert a TypeScript Map to JSON. Both of these methods would significantly reduce the number of lines to convert
           * a TS Map to JSON. However, with how the IComponent is structured, using these two methods will result to a cyclic object value
           * TypeError. For the future developers of this system, if you can find a better way to this, by all means change the code. -"el gwapo"
           * P.S. The conversion is done because JS cannot read TypeScript Map, thus rendering it impossible to save the data to the database.
           *****/
          for (let i = 0; i < nativeKeys.length; i++) { 
            let componentList = {};                     
            console.log(this.componentListMap.get(nativeKeys[i])?.length);
            for (let j = 0; j < this.componentListMap.get(nativeKeys[i])?.length!; j++) {
              let props = {};
              let propKeys = Object.keys(this.componentListMap.get(nativeKeys[i])![j].props);
              for (let k = 0; k < propKeys.length; k++) {
                let value = this.componentListMap.get(nativeKeys[i])![j].props[propKeys[k]];
                if (typeof value === 'object') {
                  value = JSON.stringify(value);
                }
                props[propKeys[k]] = value;
              }
              componentList[j] = props;
            }
            tabSort[nativeKeys[i]] = componentList;
          }

          let compListVal = {
            componentList: tabSort,
            canvasKeys: keys,
            canvasNativeKeys: nativeKeys
          }
          
          this.service.saveData(compListVal, "components").subscribe(res => {
            //some stuff
          });
        });
      });
    });
  }
}