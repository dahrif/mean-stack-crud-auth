import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import {AuthServiceService} from '../auth-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {


  title:String = "Product Management";
  userIsAuthenticated:boolean=false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  onLogout(){
    this.authService.logout();

  }
  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();

  }

}
