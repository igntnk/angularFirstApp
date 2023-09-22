import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from  '@angular/material/dialog';
import { Student } from 'src/app/modules/students';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { DialogEditWrapperComponent } from '../dialog-edit-wrapper/dialog-edit-wrapper.component';

@Component({
  selector: 'app-dialog-edit-info',
  templateUrl: './dialog-edit-info.component.html',
  styleUrls: ['./dialog-edit-info.component.css']
})
export class DialogEditInfoComponent {
  editingStudent: Student;
  localName: string;
  localSurname: string;

  constructor(public dialogRef: MatDialogRef<DialogEditWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private baseService:BaseServiceService) {
      this.editingStudent = data;
      this.localName = this.editingStudent.name;
      this.localSurname = this.editingStudent.surname;
 }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
    this.editingStudent.name= this.localName;
    this.editingStudent.surname = this.localSurname;
  }

  onEditClick(){
    this.dialogRef.close();
  }
}
