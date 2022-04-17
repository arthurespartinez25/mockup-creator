import { Component, EventEmitter, HostListener, Inject, Input, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IComponent } from 'src/app/interfaces/icomponent';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsersService } from '../../../service/users.service';
import { Subscription } from 'rxjs';
import { CrossComponentBridge } from 'src/app/service/crossComponentBridge.service';
import { MdbModalRef} from 'mdb-angular-ui-kit/modal';
import { LoadComponent } from './load/load.component';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit {
  modalRef: MdbModalRef<LoadComponent> | null = null;
  projID: string; //change this to a fetched string 
  canvasKeys: string[] = [];
  projectName: string;
  subscription: Subscription;

  @Input() componentListMap: Map<string, IComponent[]>;
  @Input() style: string;
  @Input() tabList: any;
  @Input() currentTab: string;

  @Output() updateProjectNameEvent = new EventEmitter<string>();
  
  constructor(
    public dialog: MatDialog,
    private service: UsersService,
    private crossComponentBridge: CrossComponentBridge) {
      this.subscription = this.crossComponentBridge.getValue().subscribe(trigger => {
        if (trigger.value == 1) {
          this.onSave();
        }
      })
    }

  ngOnInit(): void {
  }
  
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    if (this.componentListMap.size != 0) {
      if (this.projID) {
        this.previousStateSave();
      }
      for (let i = 0; i < this.componentListMap.size; i++) {
        if (this.componentListMap.get(this.tabList[i].id)?.length != 0) {
          event.preventDefault();
          event.returnValue = '';
          this.onSave();
          break;
        }
      }
    }
    return false;
  }

  previousStateSave() {
    let tabIDs: string[] = [];
    for (let i = 0; i < this.tabList.length; i++) {
      tabIDs.push(this.tabList[i].id);
    }
    let tabIndex = tabIDs.indexOf(this.currentTab) > (this.canvasKeys.length - 1) ? (this.canvasKeys.length - 1) : tabIDs.indexOf(this.currentTab);
    let prevStateData = {
      projectID : this.projID,
      tabID : this.canvasKeys[tabIndex],
      tabSequence : this.canvasKeys
    }
    this.service.saveData(prevStateData, "previousState").subscribe();
  }

  onSave() {
    const documentSaveDialogRef =
    this.dialog.open(SaveDataComponent, {
      data: {
        value: this.componentListMap,
        style: this.style
      }
    });

    documentSaveDialogRef.afterClosed().subscribe(res => {
      if (res.data) {
        this.projID = res.data;
        this.canvasKeys = res.keys;
        this.projectName = res.projectName;
      }
      this.updateProjectNameEvent.emit(this.projectName);
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
  style: string;
  projID: string;
  projectName: string;
  keys: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loginCookie:CookieService,
    public dialogRef: MatDialogRef<SaveDataComponent>,
    public _router: Router,
    private service: UsersService
  ) {
    this.componentListMap = data.value;
    this.style = data.style;
  }

  ngOnInit(): void {
    this.saveName = "Project";
  }

  onCancelClick() { //closes dialog box
    this.dialogRef.close({
      data: this.projID,
      keys: this.keys,
      projectName: this.projectName
    });
  }

  onSaveClick(value: string) {
    console.log(this.componentListMap);
    let id = { //fetch the current user's user id
      userID: this.loginCookie.get("userID")
    }

    this.service.getSaveTotal(id).subscribe(res => { //gets the total projects the user has saved under the account
      this.projID = "user" + this.loginCookie.get("userID") + "_proj" + (Object.values(res)[0] + 1);
      this.projectName = value;
      let projVal = { 
        userID: parseInt(this.loginCookie.get("userID")),
        projectName: value,
        projectID: this.projID
      };

      this.service.saveData(projVal, "project").subscribe(res=> { //saves the project to projects_table
        console.log(res);
        let nativeKeys: string[] = [];
        let canvasNames: string[] = [];

        for (let key of this.componentListMap.keys()) {
          nativeKeys.push(key);
          this.keys.push(this.projID + "_" + key);
        }

        for (let i = 0; i < this.keys.length; i++) { //temporary canvas names until tabs can be renamed. Once possible, remove this for-loop
          canvasNames.push("Canvas " + (i + 1));//and fetch the data from the tab names instead
        }

        let tabVal = {
          canvasKeys: this.keys,
          canvasNames: canvasNames
        }

        this.service.saveData(tabVal, "tab").subscribe(res=> { //saves the tab details to tab_table
          console.log(this.componentListMap)
          let tabSort = {};
          let tableIds: string[] = [];
          let tableContent: any[] = [];
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
                if (propKeys[k] == "id") {
                  if (this.componentListMap.get(nativeKeys[i])![j].props.typeObj == "tableDrag") {
                    tableIds.push(value);
                  }
                }
                if (typeof value === 'object') {
                  if (propKeys[k] == "tblContent") {
                    tableContent.push(value);
                  }
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
            canvasKeys: this.keys,
            canvasNativeKeys: nativeKeys
          }
          
          this.service.saveData(compListVal, "components").subscribe(res => { //saves components to database
            if (tableIds.length != 0) {
              let tableContentData = {
                projectID: this.projID,
                tblIds: tableIds,
                tblContent: tableContent
              }
              this.service.saveData(tableContentData, "tableContent").subscribe();
            }
            if (this.style) {
              this.style = this.style.replace(/\n/g, ''); //remove newline from the string
              let splitted = this.style.split("}");
              let cssName: string[] = [];
              let cssProps: string[] = [];

              for (let i = 0; i < (splitted.length - 1); i++) { //-1? split somehow includes a "" at the end of the array
                let toSplit: string[];
                toSplit = splitted[i].split("{");
                cssName.push(toSplit[0].trim());
                cssProps.push(toSplit[1]);
              }

              let cssRuleSet = {
                projectID: this.projID,
                name: cssName,
                properties: cssProps
              }

              this.service.saveData(cssRuleSet, "css").subscribe(res => { //saves css to database
                //stuff
              });
            }
            this.onCancelClick();
          });
        });
      });
    });
  }
}