import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { products } from '../_model/products';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }

  Loadproducts(){
    return this.http.get<products[]>("http://localhost:3000/products");
  }
}
