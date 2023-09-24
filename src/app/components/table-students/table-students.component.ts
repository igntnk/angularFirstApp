import { DialogEditInfoComponent } from './../student-editor/dialog-edit-info/dialog-edit-info.component';
import { DialogEditWrapperComponent } from './../student-editor/dialog-edit-wrapper/dialog-edit-wrapper.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { Student } from 'src/app/modules/students';
import { BaseRouteReuseStrategy } from '@angular/router';
import { subscribeOn } from 'rxjs';

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
    this.baseService.getAllStudents().subscribe(data => {
      this.students = data;
    });
    }

  addNewStudent(){
    const dialogAddingNewStudent = this.dialog.open(DialogEditWrapperComponent,{
      width: '400px',
      data: null,
    });
    dialogAddingNewStudent.afterClosed().subscribe((result:Student)=>{
      if(result != null)
      {
        console.log("adding new student: "+ result.name);
        this.baseService.addNewStudent(result).subscribe(k =>
          this.baseService.getAllStudents().subscribe(data => this.students = data))
      }
    })
  }

  editStudent(student: Student){
    const dialogEdiingStudent = this.dialog.open(DialogEditInfoComponent, {
      width: '400px',
      data: student
    });
    dialogEdiingStudent.afterClosed().subscribe((result:Student)=>{
      if(result != null)
      {
        console.log("adding new student: "+ result.name);
        this.baseService.editStudent(result).subscribe(k =>
          this.baseService.getAllStudents().subscribe(data => this.students = data))
      }
    })
  }

  deleteUser(student: Student){
    if(student != null){
      console.log("delete student");
      this.baseService.deleteStudent(student).subscribe(k =>
        this.baseService.getAllStudents().subscribe(data => this.students = data));
    }
  }

}
