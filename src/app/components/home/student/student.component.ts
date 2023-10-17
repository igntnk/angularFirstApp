import { Observable } from 'rxjs';
import { Student } from 'src/app/modules/students';
import { MatDialog } from '@angular/material/dialog';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { AfterViewInit, Component, ViewChild, NgModule } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DialogEditInfoComponent } from '../../student-editor/dialog-edit-info/dialog-edit-info.component';
import { DialogEditWrapperComponent } from '../../student-editor/dialog-edit-wrapper/dialog-edit-wrapper.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  displayedColumns: string[] = ['id', 'name', 'surname', 'action'];
  dataSource = new MatTableDataSource<Student>([]);
  localStudent: Student = new Student;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private baseService: BaseServiceService,
    public dialog:MatDialog) {
  }

  ngAfterViewInit() {
    this.baseService.getAllStudentsUser().subscribe(data => this.dataSource.data = data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.baseService.getAllStudentsUser().subscribe(data => console.log(data));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
