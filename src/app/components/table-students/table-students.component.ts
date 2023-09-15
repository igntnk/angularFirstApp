import { Component, OnInit } from '@angular/core';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { Student } from 'src/app/modules/students';

@Component({
  selector: 'app-table-students',
  templateUrl: './table-students.component.html',
  styleUrls: ['./table-students.component.css']
})

export class TableStudentsComponent implements OnInit{

  students: Student[];

  constructor(private baseService:BaseServiceService){}

  ngOnInit(): void {
    console.log("TableStudentsComponent");
    this.students = this.baseService.getAllStudents();
  }

}
