import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductlistComponent } from './productlist/productlist.component';
import { NewproductComponent } from './newproduct/newproduct.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [{path:'',component:ProductlistComponent},
                        {path:'add',component:NewproductComponent,canActivate: [AuthGuard]},
                        {path:'update/:productId',component:NewproductComponent,canActivate: [AuthGuard]},
                        {path:'login',component:LoginComponent},
                        {path:'signup',component:SignupComponent}

                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
