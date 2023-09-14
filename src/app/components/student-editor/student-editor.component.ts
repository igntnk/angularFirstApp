import { Student } from 'src/app/modules/students';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-editor',
  templateUrl: './student-editor.component.html',
  styleUrls: ['./student-editor.component.css']
})

export class StudentEditorComponent implements OnInit{

  editingStudent: Student;

  constructor(){}

  ngOnInit() {
    this.editingStudent = new Student();
  }
}
