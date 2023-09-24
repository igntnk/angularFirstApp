import { Observable } from 'rxjs';
import { Student } from 'src/app/modules/students';
import { MatDialog } from '@angular/material/dialog';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { InMemoryDataService } from './../../service/in-memory-data.service';
import { AfterViewInit, Component, ViewChild, NgModule } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DialogEditInfoComponent } from '../student-editor/dialog-edit-info/dialog-edit-info.component';
import { DialogEditWrapperComponent } from '../student-editor/dialog-edit-wrapper/dialog-edit-wrapper.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatTable } from '@angular/material/table';


@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.css'],
})

export class MaterialTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'surname', 'action'];
  dataSource: MatTableDataSource<Student>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private baseService: BaseServiceService,
    public dialog:MatDialog) {
    baseService.getAllStudents().subscribe(data => this.dataSource = new MatTableDataSource(data));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
          this.baseService.getAllStudents().subscribe(data => {
            this.dataSource = new MatTableDataSource(data);
          }));
      }
    })
  }

  editStudent(student: Student){
    const dialogEdiingStudent = this.dialog.open(DialogEditInfoComponent, {
      width: '400px',
      data: student
    });
    dialogEdiingStudent.afterClosed().subscribe((result: Student) =>{
      this.baseService.editStudent(result).subscribe(data =>{
      });
    })


  }

  deleteUser(student: Student){
    if(student != null){
      this.baseService.deleteStudent(student).subscribe(k =>{
        this.baseService.getAllStudents().subscribe(data => {
          this.dataSource = new MatTableDataSource(data);
        })
      })
    }
  }
}

