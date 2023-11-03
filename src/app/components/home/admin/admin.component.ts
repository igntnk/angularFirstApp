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
import { PageResponse } from 'src/app/model/pageResponse';


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
  length!: number;
  constLength: number;
  filter: String = "";

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

    this.authService.getCurrentUsers(this.pageIndex,this.pageSize, "$empty").subscribe((data:PageResponse) => {
      this.dataSource.data = data.content;
      this.length = data.totalElements;
    });
  }

  applyFilter(event: Event) {
    this.filter = (event.target as HTMLInputElement).value;
    if(this.filter.length == 0 ){this.filter = "$empty";}
    this.authService.getCurrentUsers(this.paginator.pageIndex,this.paginator.pageSize,this.filter).subscribe((data:PageResponse) => {
      this.dataSource.data = data.content;
      this.dataSource._updatePaginator(data.totalElements);
      this.pageIndex = data.number;
      this.paginator.pageIndex = data.number;

      console.log(data);

      // console.log("PAGINATOR: index: " + this.paginator.pageIndex + " size: " + this.paginator.pageSize + " length: " + this.paginator.length);
      // console.log("LOCAL: index: " + this.pageIndex + " size: " + this.pageSize + " length: " + this.length);
    });
    return event;
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
    if(this.filter.length == 0 ){this.filter = "$empty";}
    this.authService.getCurrentUsers(this.paginator.pageIndex,this.paginator.pageSize,this.filter).subscribe((data:PageResponse) => {
      this.dataSource.data = data.content;
      this.dataSource._updatePaginator(data.totalElements);
      this.pageIndex = data.number;
      console.log(data);
      // console.log("PAGINATOR: index: " + this.paginator.pageIndex + " size: " + this.paginator.pageSize + " length: " + this.paginator.length);
      // console.log("LOCAL: index: " + this.pageIndex + " size: " + this.pageSize + " length: " + this.length);
    });
    return event;
  }
}
