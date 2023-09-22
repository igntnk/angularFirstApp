import { Injectable } from '@angular/core';
import { Student } from 'src/app/modules/students';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  private studentsUrl = 'api/students';

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl);
  }

  addNewStudent(student: Student): Observable<Student>{
    console.log('addNewStudent');
    return this.http.post<Student>(this.studentsUrl,student).pipe();
  }

  deleteStudent(studentID: number): Observable<Student>{
    console.log('delete student');
    return this.http.delete<Student>(this.studentsUrl +"/"+ studentID).pipe();
  }

  editStudent(student: Student): Observable<Student>{
    console.log("editing student");
    return this.http.put<Student>(this.studentsUrl,student).pipe();
  }
}
