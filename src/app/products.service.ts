import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  getProducts(){
    return this.http.get("http://localhost:5000/products");
  }
  getSingleProduct(pid:string){
    return this.http.get<any>(`http://localhost:5000/singleProduct/${pid}`);

  }
  newProduct(item){
    return this.http.post("http://localhost:5000/insert",{"product":item})
    .subscribe(data=>{console.log(data)})
  }
  updateProduct(item,pid){
    return this.http.put("http://localhost:5000/update",{"product":item,"pid":pid})
    .subscribe((data)=>{console.log('updated product:',data)})
  }
  deleteProduct(uid:string){
     return this.http.delete(`http://localhost:5000/delete/${uid}`)

  }
}
