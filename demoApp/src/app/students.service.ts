import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn:'root'
})
export class StudentService {

  studentURL = "/api/studentsInDB";
  constructor( private httpclient: HttpClient ){}

  getStudents():Observable<any> {
    return this.httpclient.get<any>(this.studentURL);
  }

  createStudent(student): Observable<any> {
    let httpheaders = new HttpHeaders().set('content-type','application/Json');
    let options = { headers : httpheaders };
    return this.httpclient.post<any>(this.studentURL, student, options);
  }

  editStudent(student): Observable<any> {
    let httpheaders = new HttpHeaders().set('content-type','application/Json');
    let options = { headers : httpheaders };
    return this.httpclient.put<any>(this.studentURL,student,options);
  }

  deleteStudent(id): Observable<any> {
    return this.httpclient.delete(`${this.studentURL}/${id}`);
  }
}
