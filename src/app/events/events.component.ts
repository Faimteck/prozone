import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpRequestService } from 'app/services/http-request/http-request.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  dataLists: any = [];
  events: FormGroup;
  submitted = false;
  showLoader = false;
  eventId: any = null;
  baseUrl;
	categoryId: any;
  displayedColumns: string[] = ['icon', 'comments', 'delete'];
  dataSource: any;
  pageSizeOptions = [10, 20, 50];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private http: HttpRequestService) { 
  }

  ngOnInit(): void {
    this.events = new FormGroup({
      icon: new FormControl('', [Validators.required]),
      comments: new FormControl('', [Validators.required])
    })
    this.loadEvents();
    this.baseUrl = environment.ServerURI;
  }

  loadEvents() {
    this.showLoader = true;
    this.http.get('api/events/get').subscribe(
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
    if(this.events.get('icon').value && this.events.get('icon').value.name){
      return this.events.get('icon').value.name;
    }
    else if(this.events.get('icon').value){
      return this.events.get('icon').value;
    }
    return '';
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.events.patchValue({
        icon: file
      });
    }
  }

  saveForm() {
    this.submitted = true;
    if (this.events.invalid) {
      return;
    }
    this.showLoader = true;
    const formData = new FormData();
    formData.append('file', this.events.get('icon').value);
    formData.append('comments', this.events.get('comments').value);
    if(this.eventId){
      formData.append('id', this.eventId);
    }
    this.http.post('api/events/create', formData).subscribe(
      (response: any) => {
        if (response && response.success) {          
          if(this.eventId){
            for(var i = 0;i < this.dataLists.length;i++){
              if(this.dataLists[i]._id == this.eventId){
                this.dataLists[i] = this.events.value;
                this.dataLists[i]._id = this.eventId;
              }
            }
           this.http.successHandling("Updated successfully");
          }
          else{
            this.dataLists.unshift(response.success);
            this.http.successHandling("Created successfully");
          }          
          this.loadMaterial();
          this.events.reset();
          this.eventId = null;
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
    this.events.patchValue(element);
    this.eventId = element._id;
  }

  cancel(){
    this.eventId = null;
    this.events.reset();
  }

  delete(id, index){
    this.showLoader = true;
    this.http.post('api/events/delete', {id: id}).subscribe(
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
  icon: string;
  comments: string;
}