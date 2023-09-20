import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from  '@angular/material/dialog';
import { Student } from 'src/app/modules/students';
import { BaseServiceService } from 'src/app/service/base-service.service';

@Component({
  selector: 'app-dialog-edit-wrapper',
  templateUrl: './dialog-edit-wrapper.component.html',
  styleUrls: ['./dialog-edit-wrapper.component.css']
})

export class DialogEditWrapperComponent{
  editingStudent: Student;

  constructor(public dialogRef: MatDialogRef<DialogEditWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private baseService:BaseServiceService) {}

  ngOnInit() {
    this.editingStudent = new Student();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    this.baseService.addNewStudent(this.editingStudent);
    this.editingStudent= new Student();
  }
}
