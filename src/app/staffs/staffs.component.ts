import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpRequestService } from 'app/services/http-request/http-request.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.css']
})
export class StaffsComponent implements OnInit {

  dataLists: any = [];
  roles: any = [];
  staffForm: FormGroup;
  submitted = false;
  showLoader = false;
  staffId: any = null;

  displayedColumns: string[] = ['name', 'email', 'mobile', 'role', 'delete'];
  dataSource: any;
  pageSizeOptions = [10, 20, 50];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private http: HttpRequestService) { 
  }

  ngOnInit(): void {
    this.staffForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    })
    this.loadRoles();
    this.loadStaffs();
  }

  loadRoles() {
    this.showLoader = true;
    this.http.get('api/roles/get').subscribe(
      (response) => {
        this.roles = response;
        this.showLoader = false;       
      },
      (error) => {
        this.showLoader = false;
        this.http.exceptionHandling(error);
      }
    )
  }
  
  loadStaffs() {
    this.showLoader = true;
    this.http.get('api/staffs/get').subscribe(
      (response) => {
        this.dataLists = response;
        this.loadMaterial(); 
        this.showLoader = false;       
      },
      (error) => {
        this.showLoader = false;
        this.http.exceptionHandling(error);
      }
    )
  }

  loadMaterial(){
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.dataLists);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.staffForm.patchValue({
        icon: file
      });
    }
  }

  saveForm() {
    this.submitted = true;
    if (this.staffForm.invalid) {
      return;
    }
    this.showLoader = true;
    let formData: any = {
      name: this.staffForm.get('name').value,
      email: this.staffForm.get('email').value,
      mobile: this.staffForm.get('mobile').value,
      role: this.staffForm.get('role').value,
      password: '123456',
    }
    if(this.staffId){
      formData.id = this.staffId
    }
    this.http.post('api/staffs/create', formData).subscribe(
      (response: any) => {
        if (response && response.success) {          
          if(this.staffId){
           this.http.successHandling("Updated successfully");
          }
          else{
            this.http.successHandling("Created successfully");
          }          
          this.loadStaffs();
          this.loadMaterial();
          this.staffForm.reset();
          this.staffId = null;
        }
        this.showLoader = false;
      },
      (error) => {
        this.showLoader = false;
        this.http.exceptionHandling(error);
      }
    )
  }

  viewElement(element){
    this.staffForm.patchValue(element);
    this.staffId = element._id;
  }

  cancel(){
    this.staffId = null;
    this.staffForm.reset();
  }

  delete(id, index){
    this.showLoader = true;
    this.http.post('api/staffs/delete', {id: id}).subscribe(
      (response: any) => {
        if (response && response.success) {
          this.http.successHandling("Deleted successfully");
          this.dataLists.splice(index, 1);
          this.loadMaterial();
        }
        this.showLoader = false;
      },
      (error) => {        
        this.showLoader = false;
        this.http.exceptionHandling(error);
      }
    )
  }
}

export interface PeriodicElement {
  name: string;
  email: string;
  mobile: string;
  role: string;
}