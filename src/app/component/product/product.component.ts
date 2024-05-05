import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MasterService } from '../../_service/master.service';
import { products } from '../../_model/products';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MaterialModule,DataTablesModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  productlist!:products[]
  dtoptions:Config={}
  dttrigger:Subject<any>=new Subject<any>();

  constructor(private service: MasterService) {

  }
  ngOnInit(): void {
    this.loadproducts();
    this.dtoptions={
      pagingType:'full_numbers',
      lengthMenu:[8,15,20,25],
      // pageLength:8
      // paging:false,
      // ordering:false,
      // searching:false
      order:[2,'desc'],
      // lengthChange:false
      // scrollY:'300',
      language:{
        searchPlaceholder:'Enter product name'
      }
    }
  }

  loadproducts(){
    this.service.Loadproducts().subscribe(item=>{
      this.productlist=item;
      this.dttrigger.next(null);
    })
  }

}
