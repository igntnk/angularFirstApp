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
    return this.http.post<Student>(this.studentsUrl,student).pipe();
  }

  deleteStudent(student: Student): Observable<Student>{
    return this.http.delete<Student>(this.studentsUrl +"/"+ student.id).pipe();
  }

  editStudent(student: Student): Observable<Student>{
    return this.http.put<Student>(this.studentsUrl,student).pipe();
  }
}
