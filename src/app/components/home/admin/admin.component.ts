import { AuthService } from 'src/app/model/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Student } from 'src/app/modules/students';
import { MatDialog } from '@angular/material/dialog';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { AfterViewInit, Component, ViewChild, NgModule } from '@angular/core';
import {  MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {  MatSort, MatSortModule} from '@angular/material/sort';
import {  MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DialogEditInfoComponent } from '../../student-editor/dialog-edit-info/dialog-edit-info.component';
import { DialogEditWrapperComponent } from '../../student-editor/dialog-edit-wrapper/dialog-edit-wrapper.component';
import { MatTable } from '@angular/material/table';
import { CredentialResponce } from 'src/app/model/auth/credintialResponse';
import { MatSortable } from '@angular/material/sort';
import { StudentEditorComponent } from '../../student-editor/student-editor.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'surname', 'action'];
  dataSource = new MatTableDataSource<Student>([]);
  localStudent: Student = new Student;
  user!: CredentialResponce;
  pageEvent!: PageEvent;
  pageIndex:number = 0;
  pageSize:number = 5;
  length: number = 100;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginatorIntl) paginatorLabel: MatPaginatorIntl;

  constructor(private baseService: BaseServiceService, private cookie: CookieService,
    private authService:AuthService,public dialog:MatDialog) {
  }

  ngAfterViewInit() {
    this.user = this.authService.LoggedUser;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.authService.getCurrentUsers(this.pageIndex,this.pageSize).subscribe(data => {
      this.dataSource.data = data;
    });
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
        this.authService.addUser(result).subscribe(unused => {
          this.authService.getUsersByAdmin().subscribe(data => {
            this.dataSource.data = data;
          })
        });
      }
    })
  }

  editStudent(student: Student){
    this.localStudent.id = student.id;
    this.localStudent.name = student.name;
    this.localStudent.surname = student.surname;
    const dialogEdiingStudent = this.dialog.open(DialogEditInfoComponent, {
      width: '400px',
      data: this.localStudent
    });
    dialogEdiingStudent.afterClosed().subscribe((result: Student) =>{
      this.authService.editUser(result).subscribe(unused =>{
        this.authService.getUsersByAdmin().subscribe(data => {
          this.dataSource.data = data;
        })
      });
    })


  }

  deleteUser(student: Student){
    if(student != null){
      this.authService.deleteUser(student).subscribe(unused => {
          this.authService.getUsersByAdmin().subscribe(data => {
            this.dataSource.data = data;
          })
      });
    }
  }

  public changeInfo(event:PageEvent){
    this.pageSize = this.paginator.pageSize;
    this.pageIndex = this.paginator.pageIndex;
    this.authService.getCurrentUsers(this.pageIndex,this.pageSize).subscribe(data =>{
      this.dataSource.data = data;
    });
    return event;
  }
}
