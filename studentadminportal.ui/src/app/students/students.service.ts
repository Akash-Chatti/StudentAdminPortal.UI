import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../Models/api-models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private baseUrl = 'https://localhost:44308';
  constructor(private httpClient: HttpClient) {}
  getStudent(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseUrl + '/Student');
  }
}
