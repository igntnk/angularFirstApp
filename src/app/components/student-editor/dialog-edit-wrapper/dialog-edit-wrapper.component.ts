import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from  '@angular/material/dialog';
import { Student } from 'src/app/modules/students';

@Component({
  selector: 'app-dialog-edit-wrapper',
  templateUrl: './dialog-edit-wrapper.component.html',
  styleUrls: ['./dialog-edit-wrapper.component.css']
})

export class DialogEditWrapperComponent{
  editingStudent: Student;

  constructor(public dialogRef: MatDialogRef<DialogEditWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.editingStudent = new Student();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
