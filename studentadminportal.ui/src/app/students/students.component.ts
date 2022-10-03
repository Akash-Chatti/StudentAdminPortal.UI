import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Student } from '../Models/ui-models/student.model';
import { StudentsService } from './students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'dateOfBirth',
    'email',
    'mobile',
    'gender',
  ];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString = '';
  constructor(private studentService: StudentsService) {}

  ngOnInit(): void {
    this.studentService.getStudent().subscribe({
      next: (ele) => {
        this.students = ele;
        this.dataSource = new MatTableDataSource<Student>(this.students);
        if (this.dataSource) {
          this.dataSource.paginator = this.matPaginator;
        }
        if (this.matSort) {
          this.dataSource.sort = this.matSort;
        }
        console.log(ele);
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      },
    });
  }

  filterStudents() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }
}
