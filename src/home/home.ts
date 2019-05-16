import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import LoadingSpinner from '../common/loadingSpinner';

const styles = require('./home.css');
const template = require('./home.html');
const env = require('../../env.json');

@Component({
  selector: 'home',
  template: template,
  styles: [ styles ]
})
export class Home extends LoadingSpinner {
  response: string;
  api: string;
  name: string;

  constructor( public router: Router, public http: Http) {
    super();
  }
  ngOnInit() {
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

  searchProducts( event, search, startdate, enddate, price) {
    this.showSpinner();

  this.router.navigate(['products'], { queryParams: { 'productname': search, 'startdate': startdate,
  'enddate': enddate, 'price': price}});
  window.location.reload();
  }

}
