import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from './auth-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Products';
  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }

}
