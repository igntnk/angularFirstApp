import { Injectable } from '@angular/core';
import { Student } from 'src/app/modules/students';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  students: Student[] = [{id:0,name:'Danil',surname:'Svinoyhov'},
      {id:1,name:'Ilya',surname:'Ignatenko'},
      {id:2,name:'Danil',surname:'Kabuba'}
    ];

  constructor() { }

  getAllStudents(): Student[] {
    console.log('count of students' + this.students.length);
    return this.students;
  }

  addNewStudent(student: Student): void {
    console.log('addNewStudent');
    this.students.push(student);
  }

}
