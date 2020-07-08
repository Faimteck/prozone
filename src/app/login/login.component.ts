import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any;
  password: any;
  constructor(private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    if(!this.username){
      this.toastr.error("Please enter username");
    }
    else if(!this.password){
      this.toastr.error("Please enter password");
    }
    else if(this.username.toLowerCase() != 'admin'){
      this.toastr.error("Incorrect Username");
    }
    else if(this.password != '123456'){
      this.toastr.error("Incorrect password");
    }
    else{
      this.router.navigate(['/dashboard']);
    }
  }

}
