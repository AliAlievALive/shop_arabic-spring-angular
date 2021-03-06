import { Component } from '@angular/core';
import {Product} from './models/Product';
import {HttpService} from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shop';
  products: Array<Product>;

  constructor(private http: HttpService) {
    this.getProductsFromServer();
  }

  getProductsFromServer(): void {
    this.http.getProducts().subscribe(products => {
      console.log(products);
      this.products = products;
    });
  }

  deleteProduct(product: Product): void {
    this.http.delete(product.id);
    this.products.splice(this.products.indexOf(product), 1);
  }
}
