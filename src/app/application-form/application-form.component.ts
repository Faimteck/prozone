import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpRequestService } from 'app/services/http-request/http-request.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {

  dataLists: any = [];
  applicationData: any = [];
  categoryData: any = [];
  subCategoryData: any = [];
  showLoader = false;

  displayedColumns: string[] = ['email', 'mobile'];
  dataSource: any;
  pageSizeOptions = [10, 20, 50];
  categories: any;
  subcategories: any;
  status = [
    {
      name: 'Pending'
    },
    {
      name: 'Completed'
    },
    {
      name: 'Rejected'
    }
  ]

  types = [
    {
      name: 'Business'
    },
    {
      name: 'Individual'
    }
  ]

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private http: HttpRequestService, private router: Router) { 
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadCategories();
    this.loadSubCategories();
    this.getApplicationList();
  }

  loadUsers() {
    this.showLoader = true;
    this.http.get('api/users/get').subscribe(
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

  getApplicationList() {
    this.showLoader = true;
    this.http.get('application/get').subscribe(
      (response) => {
        this.applicationData = response;
        this.applicationData.forEach(element => {
          if(element.categoryID && this.categoryData.length > 0) {
            this.categoryData.forEach(element1 => {
              if(element1._id == element.categoryID)
                element.categoryName = element1.name_english;
            });
          }
          if(element.subCategoryID && this.subCategoryData.length > 0) {
            this.subCategoryData.forEach(element1 => {
              if(element1._id == element.subCategoryID)
                element.subCategoryName = element1.name_english;
            });
          }
          // if(element.userID && this.dataLists.length > 0){
          //   this.dataLists.forEach(element1 => {
          //     if(element1._id == element.userID)
          //       element.userName = element1.name;
          //   });
          // }
        });
        this.showLoader = false;       
      },
      (error) => {
        this.showLoader = false;
        this.http.exceptionHandling(error);
      }
    )
  }

  loadCategories() {
    this.showLoader = true;
    this.http.get('api/category/get-category').subscribe(
      (response) => {
        this.categoryData = response;
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
        this.subCategoryData = response;
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

  selectApplication(id){
    this.router.navigate(['/application-view'], {queryParams: {applicationId: id}})
  }

  getStatus(status){
    let result = 'Not started';
    if(status && Array.isArray(status) && status.length > 0){
      result = status[0].status;
    }
    return result;
  }

}

export interface PeriodicElement {
  email: string;
  mobile: string;
}