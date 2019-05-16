import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { contentHeaders } from '../common/headers';
import LoadingSpinner from '../common/loadingSpinner';


const styles = require('./products.css');
const template = require('./products.html');
const env = require('../../env.json');

@Component({
  selector: 'products',
  template: template,
  styles: [ styles ]
})


export class Products extends LoadingSpinner implements OnInit {
  jwt: string;
  decodedJwt: string;
  response: string;
  api: string;
  products: Array<Product> = new Array<Product>();
  productCount: number;
  productname: string;
  startdate: date;
  enddate: date;
  price: number;

  constructor( public router: Router, public http: Http, private route: ActivatedRoute) {
    super();
  }
    ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.productname = params['productname'];
        this.startdate = params['startdate'];
        this.enddate = params['enddate'];
        this.price = params['price'];
      });

    this.getProducts( this.productname, this.startdate, this.enddate, this.price);
    $(function() {
            $('#startdate').datetimepicker({
                format: 'YYYY-MM-DD'
            });
            $('#enddate').datetimepicker({
                format: 'YYYY-MM-DD'
            });
            $('#startdate1').datetimepicker({
                format: 'YYYY-MM-DD'
            });
            $('#enddate1').datetimepicker({
                format: 'YYYY-MM-DD'
            });
        });
    }


  getProducts( productname, startdate, enddate, price) {

    this.showSpinner();
    let body = JSON.stringify({ 'productname': productname,
    'startdate': startdate, 'enddate': enddate, 'price': price});
    this.http.post(env.apiUrl + 'api/product/search', body, { headers: contentHeaders })
      .subscribe(
        response => {
          this.hideSpinner();
          this.productCount = response.json().total;
          if ( response.json().total > 0) {
            this.products = response.json().products;
          }
        },
        error => {
          this.hideSpinner();
          console.log(error.text());
          alert((JSON.parse(error.text())).message);
        },
      );
  }

  addToCart(event, id) {
    this.showSpinner();
    event.preventDefault();
    let body = JSON.stringify({ 'product_id': id });
    this.http.post(env.apiUrl + 'api/cart/add', body, { headers: contentHeaders })
      .subscribe(
        resp => {
          this.hideSpinner();
          console.log(resp);
          alert('Successfully Added');
        },
        error => {
          this.hideSpinner();
          console.log(error.text());
          alert((JSON.parse(error.text())).message);
        },
      );
  }

  showKeyValuePair( attributes: string ) {
    let json = JSON.parse(attributes);
    let str = '';
    Object.keys(json).forEach(element => {
      str += '<tr><td><strong>' + element + '</strong></td><td>' + json[element] + '</td></tr>';

    });
    return '<table class="table is-bordered is-narrow">' + str + '</table>';
  }

  searchProducts( event, productname: string, startdate: date, enddate: date, price: number ) {
    this.showSpinner();
    this.router.navigate(['products']);
    let body = JSON.stringify({ 'productname': productname,
    'startdate': startdate, 'enddate': enddate, 'price': price});
    this.http.post(env.apiUrl + 'api/product/search', body, { headers: contentHeaders })
      .subscribe(
        response => {
          this.hideSpinner();
          this.productCount = response.json().total;
          if ( response.json().total > 0) {
            this.products = response.json().products;
          }
        },
        error => {
          this.hideSpinner();
          console.log(error.text());
          alert((JSON.parse(error.text())).message);
        },
      );
  }

}

interface Product {
    id: number;
    product_name: string;
    price: number;
    product_category: string;
    product_sub_category: string;
    attributes: JSON;
}
