import { Injectable } from '@angular/core';
import { Student } from 'src/app/modules/students';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  private studentsUrl = 'api/home';
  private adminUrl = 'api/admin';

  constructor(private http: HttpClient) { }

  getAllStudentsAdmin(): Observable<Student[]> {
    return this.http.get<Student[]>(this.adminUrl + "/users");
  }

  getAllStudentsUser(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl + "/users");
  }

  addNewStudent(student: Student): Observable<Student>{
    return this.http.post<Student>(this.adminUrl,student).pipe();
  }

  deleteStudent(student: Student): Observable<Student>{
    return this.http.delete<Student>(this.adminUrl +"/"+ student.id).pipe();
  }

  editStudent(student: Student): Observable<Student>{
    return this.http.put<Student>(this.adminUrl,student).pipe();
  }
}
