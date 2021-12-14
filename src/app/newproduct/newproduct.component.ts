import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ProductModel } from '../productlist/product.model';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent implements OnInit {
  public mode = "create";
  private pid: string;
  singleProduct:any;
  title:String = "";
  constructor(private productService:ProductsService,private router:Router,public activeRoute:ActivatedRoute) { }
  productItem :any;

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("productId")) {
        this.mode = "update";
        this.pid = paramMap.get("productId");
        this.title='Update Product';
        // this.isLoading = true;
        this.productService.getSingleProduct(this.pid).subscribe(product => {
          // this.isLoading = false;
          this.singleProduct = JSON.parse(JSON.stringify(product)) ;
          console.log(this.singleProduct);
          let {
            productName,
            productEmail,
            productPassword
            }=this.singleProduct.product;

            this.productItem= new ProductModel(productName,productEmail,productPassword);
        });


      } else {
        this.mode = "create";
        this.pid = null;
        this.title='Create Product';
        this.productItem= new ProductModel(null,null,null);
      }
    });
  }
  AddProduct(){
    if(this.mode==='create'){
      this.productService.newProduct(this.productItem);
      console.log("product added");
      alert("Success");
      this.router.navigate(['/']);

    }
    else if(this.mode==='update'){
       this.updateProduct();
    }

  }

  updateProduct(){
    this.productService.updateProduct(this.productItem,this.pid);
    console.log('product updated');
    alert('product updated');
    this.router.navigate(['/']);
  }

}
