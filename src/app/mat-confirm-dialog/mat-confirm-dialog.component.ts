import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from '../service/language/language.service';
@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrls: ['./mat-confirm-dialog.component.css']
})
export class MatConfirmDialogComponent implements OnInit {


  constructor(private languageService: LanguageService, @Inject(MAT_DIALOG_DATA)public data,
  public dialogRef: MatDialogRef<MatConfirmDialogComponent>) { }

  ngOnInit(): void {
    
  }
 
}
