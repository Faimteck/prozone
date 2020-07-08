import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpRequestService } from 'app/services/http-request/http-request.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {

  dataLists: any = [];
  categories: any = [];
  subCategory: FormGroup;
  submitted = false;
  showLoader = false;
  subcategoryid: any = null;
  baseUrl;

  displayedColumns: string[] = ['name_english', 'name_arabic', 'category_name', 'icon', 'sequence', 'business', 'individual', 'delete'];
  dataSource: any;
  pageSizeOptions = [10, 20, 50];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private http: HttpRequestService) { 
  }

  ngOnInit(): void {
    this.subCategory = new FormGroup({
      name_english: new FormControl('', [Validators.required]),
      name_arabic: new FormControl('', [Validators.required]),
      parent_category: new FormControl('', [Validators.required]),
      color: new FormControl(''),
      icon: new FormControl('', [Validators.required]),
      sequence: new FormControl(''),
      business: new FormControl(false),
      individual: new FormControl(false)
    })
    this.loadCategories();
    this.loadSubCategories();
    this.baseUrl = environment.ServerURI;
  }

  loadCategories() {
    this.showLoader = true;
    this.http.get('api/category/get-category').subscribe(
      (response) => {
        this.categories = response;
        this.showLoader = false;       
      },
      (error) => {
        this.showLoader = false;
        this.http.exceptionHandling(error);
      }
    )
  }
  
  loadSubCategories() {
    this.showLoader = true;
    this.http.get('api/category/get-subcategory').subscribe(
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
    if(this.subCategory.get('icon').value && this.subCategory.get('icon').value.name){
      return this.subCategory.get('icon').value.name;
    }
    else if(this.subCategory.get('icon').value){
      return this.subCategory.get('icon').value;
    }
    return '';
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.subCategory.patchValue({
        icon: file
      });
    }
  }

  saveForm() {
    this.submitted = true;
    if (this.subCategory.invalid) {
      return;
    }
    this.showLoader = true;
    const formData = new FormData();
    formData.append('name_english', this.subCategory.get('name_english').value);
    formData.append('name_arabic', this.subCategory.get('name_arabic').value);
    formData.append('parent_category', this.subCategory.get('parent_category').value);
    formData.append('color', this.subCategory.get('color').value);
    formData.append('file', this.subCategory.get('icon').value);
    formData.append('sequence', this.subCategory.get('sequence').value);
    formData.append('business', this.subCategory.get('business').value ? this.subCategory.get('business').value : false);
    formData.append('individual', this.subCategory.get('individual').value ? this.subCategory.get('individual').value : false);
    if(this.subcategoryid){
      formData.append('id', this.subcategoryid);
    }
    this.http.post('api/category/create', formData).subscribe(
      (response: any) => {
        if (response && response.success) {          
          if(this.subcategoryid){
           this.http.successHandling("Updated successfully");
          }
          else{
            this.http.successHandling("Created successfully");
          }          
          this.loadSubCategories();
          this.loadMaterial();
          this.subCategory.reset();
          this.subcategoryid = null;
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
    this.subCategory.patchValue(element);
    this.subcategoryid = element._id;
  }

  cancel(){
    this.subcategoryid = null;
    this.subCategory.reset();
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
  category_name: string;
  color: string;
  icon: string;
  sequence: string;
  business: string;
  individual: string;
}