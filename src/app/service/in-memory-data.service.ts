import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Student } from '../modules/students';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const students = [
    {id: 0, name: 'Kabub', surname: 'Danilov'},
    {id: 1, name: 'Daniil', surname: 'Svinoukhov'},
    {id: 2, name: 'Andrey', surname: 'Abramov'},
    {id: 3, name: 'Kirill', surname: 'Bezugliy'}
    ];
    return {students};
  }

  genId(students: Student[]): number{
    return students.length > 0 ? Math.max(...students.map(student=>student.id))+1:11;
  }

}
