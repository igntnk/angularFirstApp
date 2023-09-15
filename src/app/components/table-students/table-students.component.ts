import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { Student } from 'src/app/modules/students';
import { DialogEditWrapperComponent } from '../student-editor/dialog-edit-wrapper/dialog-edit-wrapper.component';

@Component({
  selector: 'app-table-students',
  templateUrl: './table-students.component.html',
  styleUrls: ['./table-students.component.css']
})

export class TableStudentsComponent implements OnInit{

  students: Student[];

  constructor(private baseService:BaseServiceService,
    public dialog: MatDialog){}

  ngOnInit(): void {
    console.log("TableStudentsComponent");
    this.students = this.baseService.getAllStudents();
  }

  addNewStudent(){
    const dialogAddingNewStudent = this.dialog.open(DialogEditWrapperComponent, {
      width: '400px',
      data: null
    });
  }

}
