import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-view',
  templateUrl: './staff-view.component.html',
  styleUrls: ['./staff-view.component.css']
})
export class StaffViewComponent implements OnInit {

  roles = [
    {
      id: 1,
      name: 'Admin'
    },
    {
      id: 2,
      name: 'Manager'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
