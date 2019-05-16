import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { contentHeaders } from '../common/headers';
import LoadingSpinner from '../common/loadingSpinner';

const styles = require('./cart.css');
const template = require('./cart.html');
const env = require('../../env.json');

@Component({
  selector: 'products',
  template: template,
  styles: [styles],
})
export class Cart extends LoadingSpinner {
  jwt: string;
  decodedJwt: string;
  response: string;
  api: string;
  total: number;
  cartItems: Array<CartItem> = new Array<CartItem>();

  constructor(
    public router: Router,
    public http: Http,
    public authHttp: AuthHttp,
  ) {
    super();
    this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
    this.getCart();
  }

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['login']);
  }

  getCart() {
    this.showSpinner();
    this.http.get(env.apiUrl + 'api/cart', )
      .subscribe(
      response => {
        this.hideSpinner();
        this.total = response.json().total;
        this.cartItems = response.json().cart_items;
        if (env.debug) console.log(response.json().cart_items);
      },
      error => {
        this.hideSpinner();
        alert((JSON.parse(error.text())).message);
        console.log(error.text());
      }
      );
  }

  emptyCart() {
    this.showSpinner();
    this.http.get(env.apiUrl + 'api/cart/empty')
      .subscribe(
      response => {
        this.hideSpinner();
        this.total = response.json().total;
        this.cartItems = response.json().cart_items;
        alert('Cart emptied');
        if (env.debug) console.log(response.json().cart_items);
      },
      error => {
        this.hideSpinner();
        alert((JSON.parse(error.text())).message);
        console.log(error.text());
      }
      );
  }

  removeItems(quantity, id) {
    this.showSpinner();
    let body = JSON.stringify({ 'product_id': id, 'quantity': quantity });
    this.http.post(env.apiUrl + 'api/cart/remove', body, { headers: contentHeaders })
      .subscribe(
      response => {
        this.hideSpinner();
        alert('Removed ' + quantity + ' item/s');
        this.total = response.json().total;
        this.cartItems = response.json().cart_items;
      },
      error => {
        this.hideSpinner();
        alert((JSON.parse(error.text())).message);
        console.log(error.text());
      }
      );
  }
}

interface CartItem {
  id: number;
  product: Product;
  product_id: number;
  quantity: number;
  price: string;
}

interface Product {
  id: number;
  product_name: string;
  price: number;
  product_category: string;
  product_sub_category: string;
  attributes: string;
}
