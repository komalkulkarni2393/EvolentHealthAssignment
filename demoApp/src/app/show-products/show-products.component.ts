import { Component, OnInit, ɵConsole } from '@angular/core';
import {Observable} from 'rxjs';
import {StudentService} from '../students.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit {
 selectedStudent;
 students = [];
 enableEditDeleteButton = false;

  constructor(
    private productService: StudentService,
    private router: Router

  ){}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.productService.getStudents().subscribe(students => {
      this.students = students;
    });
  }

  selectStudent(event,student) {
    this.selectedStudent = student;
    this.enableEditDeleteButton = true;
  }

  editStudent() {
    console.log("in editStudent() = "+this.selectedStudent);
    var id = this.selectedStudent.id;
    this.router.navigate(["editStudent/"+id]);
  }

  deleteStudent() {
    console.log("in deleteStudent() = "+this.selectedStudent);
    this.productService.deleteStudent(this.selectedStudent.id).subscribe(p => {
      console.log("student deleted");
      this.getStudents();
    })
  }
}
