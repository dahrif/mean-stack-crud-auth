import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import {AuthServiceService} from '../../auth-service.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  errorMsg:string='';

  constructor(public authService:AuthServiceService) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = false;
    this.authService.login(form.value.email, form.value.password);

  }
  ngOnInit(): void {
  }

}
