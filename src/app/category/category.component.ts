import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpRequestService } from 'app/services/http-request/http-request.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  dataLists: any = [];
  category: FormGroup;
  submitted = false;
  showLoader = false;
  categoryId: any = null;
  baseUrl;

  displayedColumns: string[] = ['name_english', 'name_arabic', 'color', 'icon', 'sequence', 'business', 'individual', 'delete'];
  dataSource: any;
  pageSizeOptions = [10, 20, 50];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private http: HttpRequestService) { 
  }

  ngOnInit(): void {
    this.category = new FormGroup({
      name_english: new FormControl('', [Validators.required]),
      name_arabic: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      icon: new FormControl('', [Validators.required]),
      sequence: new FormControl(''),
      business: new FormControl(false),
      individual: new FormControl(false)
    })
    this.loadCategories();
    this.baseUrl = environment.ServerURI;
  }

  loadCategories() {
    this.showLoader = true;
    this.http.get('api/category/get-category').subscribe(
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

  getFileName() {
    if(this.category.get('icon').value && this.category.get('icon').value.name){
      return this.category.get('icon').value.name;
    }
    else if(this.category.get('icon').value){
      return this.category.get('icon').value;
    }
    return '';
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.category.patchValue({
        icon: file
      });
    }
  }

  saveForm() {
    this.submitted = true;
    if (this.category.invalid) {
      return;
    }
    this.showLoader = true;
    const formData = new FormData();
    formData.append('name_english', this.category.get('name_english').value);
    formData.append('name_arabic', this.category.get('name_arabic').value);
    formData.append('color', this.category.get('color').value);
    formData.append('file', this.category.get('icon').value);
    formData.append('sequence', this.category.get('sequence').value);
    formData.append('business', this.category.get('business').value ? this.category.get('business').value : false);
    formData.append('individual', this.category.get('individual').value ? this.category.get('individual').value : false);
    if(this.categoryId){
      formData.append('id', this.categoryId);
    }
    this.http.post('api/category/create', formData).subscribe(
      (response: any) => {
        if (response && response.success) {          
          if(this.categoryId){
            for(var i = 0;i < this.dataLists.length;i++){
              if(this.dataLists[i]._id == this.categoryId){
                this.dataLists[i] = this.category.value;
                this.dataLists[i]._id = this.categoryId;
              }
            }
           this.http.successHandling("Updated successfully");
          }
          else{
            this.dataLists.unshift(response.success);
            this.http.successHandling("Created successfully");
          }          
          this.loadMaterial();
          this.category.reset();
          this.categoryId = null;
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
    this.category.patchValue(element);
    this.categoryId = element._id;
  }

  cancel(){
    this.categoryId = null;
    this.category.reset();
  }

  delete(id, index){
    this.showLoader = true;
    this.http.post('api/category/delete', {id: id}).subscribe(
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
  name_english: string;
  name_arabic: string;
  color: string;
  icon: string;
  sequence: string;
  business: string;
  individual: string;
}