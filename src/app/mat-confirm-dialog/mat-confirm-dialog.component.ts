import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrls: ['./mat-confirm-dialog.component.css']
})
export class MatConfirmDialogComponent implements OnInit {



  constructor(@Inject(MAT_DIALOG_DATA)public data,
  public dialogRef: MatDialogRef<MatConfirmDialogComponent>) { }

  ngOnInit(): void {
  }
 
}
