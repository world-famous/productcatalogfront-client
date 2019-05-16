import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';
import LoadingSpinner from '../common/loadingSpinner';

const styles   = require('./register.css');
const template = require('./register.html');
const env = require('../../env.json');

@Component({
  selector: 'register',
  template: template,
  styles: [ styles ]
})
export class Register extends LoadingSpinner {
  constructor(public router: Router, public http: Http) {
    super();
  }

  register(event, name, password, email, gender) {
    event.preventDefault();
    this.showSpinner();
    let body = JSON.stringify({ name, password, email, gender});
    this.http.post(env.apiUrl + 'api/register', body, { headers: contentHeaders })
      .subscribe(
        response => {
          this.hideSpinner();
          alert('Registered');
          this.router.navigate(['login']);
        },
        error => {
          this.hideSpinner();
          alert((JSON.parse(error.text())).message);
          console.log(error.text());
        }
      );
  }

  login(event) {
    event.preventDefault();
    this.router.navigate(['login']);
  }

}
