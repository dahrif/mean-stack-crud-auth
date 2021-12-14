import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductModel } from './product.model';
import { ProductsService } from '../products.service';
import {Router} from '@angular/router';
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {AuthServiceService} from '../auth-service.service';


@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit,OnDestroy {
  private postsUpdated = new Subject<any>();
  private productsSub: Subscription;
  title:String = "Product List";
  //product is the model class for product item
  // products: ProductModel[];
  products:any;


  userIsAuthenticated = false;
  private authStatusSub: Subscription;

  showImage:boolean = false;
  //creating service object for calling get products()
  constructor(private productService:ProductsService,private router:Router,private authService: AuthServiceService) { }

  toggleImage():void{
    this.showImage = !this.showImage;
  }
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }


  ngOnInit(): void {
    //calling getproducts() and loading the products to the productsarray
    this.productService.getProducts().subscribe((data)=>{
      this.products = JSON.parse(JSON.stringify(data));
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
        });
    })
    this.productsSub=this.getPostUpdateListener()
    .subscribe((newproducts:any)=>{

        this.products=newproducts;
        console.log('updated products',this.products);
    })
  }
  onDelete(uid:string):void{

    let makeSure:boolean=confirm('Are you sure You want to Delete This Product?');
    if(makeSure){
      this.productService.deleteProduct(uid)
      .subscribe((response:{uid})=>{
        console.log(`product with id ${response.uid} deleted successfully `);

        this.productService.getProducts().subscribe((data)=>{
          const updatedProducts = JSON.parse(JSON.stringify(data));
          console.log('updated products list after deletion.')
          this.postsUpdated.next([...updatedProducts]);
        });
      })







    }

  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
