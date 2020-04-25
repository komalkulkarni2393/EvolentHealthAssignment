import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {StudentService} from '../students.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;
  mode: string = "create";
  idInUrl;
  routeSub;
  allStudents;
  studentForEdit = {
    firstName: "",
    lastName: "",
    email: "",
    phone: 0,
    status: ""

  };
  statusElement: HTMLInputElement;

  constructor(
    private formBuilder : FormBuilder,
    private productService : StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    this.addProductForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',Validators.required],
      phone: ['',Validators.required],
      status: ['']
    });

  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      console.log(params['id']) //log the value of id
      this.idInUrl = params['id'];
    });

    this.productService.getStudents().subscribe(s => {
      this.allStudents = s;
    })

    if(this.idInUrl != undefined) {
      this.mode = "edit";
      var p = parseInt(this.idInUrl);
      this.productService.getStudents().subscribe(students => {
       this.allStudents = students;
        for(let i=0;i<this.allStudents.length;i++) {
          console.log("student = "+this.allStudents[i]);
          if(p == this.allStudents[i].id) {
            this.studentForEdit.firstName = this.allStudents[i].firstName;
            this.studentForEdit.lastName = this.allStudents[i].lastName;
            this.studentForEdit.email = this.allStudents[i].email;
            this.studentForEdit.phone = this.allStudents[i].phone;
            this.studentForEdit.status = this.allStudents[i].status;
            console.log("studentForEdit = "+this.studentForEdit);
          }
        }
      });
    }
    else {
      this.mode = "create";
    }
  }

  addProduct(addProductForm) {
    let newProduct = this.addProductForm.value;
    newProduct.id = this.allStudents["length"]+1;
    this.statusElement = <HTMLInputElement>document.getElementById('status');
    var status = this.statusElement.value;
    newProduct.status = status;
    this.createNewProduct(newProduct);
  }

  editStudent(addProductForm) {
    let editedStudent = this.addProductForm.value;
    editedStudent.id = parseInt(this.idInUrl);
    this.productService.editStudent(editedStudent).subscribe(p => {
      console.log("student edited");
      this.router.navigate(['/showStudents']);
    });
  }

  createNewProduct(newProduct: any) {
    this.productService.createStudent(newProduct).subscribe( p => {
      alert("New Student added!");
      this.router.navigate(['/showStudents']);
    })
  }

}
