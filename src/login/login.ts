import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';
import LoadingSpinner from '../common/loadingSpinner';

const styles = require('./login.css');
const template = require('./login.html');
const env = require('../../env.json');

@Component({
  selector: 'login',
  template: template,
  styles: [styles]
})
export class Login extends LoadingSpinner {
  constructor(public router: Router, public http: Http) {
    super();
  }

  login(event, username, password) {
    event.preventDefault();
    let body = JSON.stringify(
      {
        'username': username,
        'password': password,
        'grant_type': 'password',
        'client_id': env.clientId,
        'client_secret': env.clientSecret,
        'scope': '*'
      });
    this.showSpinner();
    this.http.post(env.apiUrl + 'oauth/token', body, { headers: contentHeaders })
      .subscribe(
      response => {
        this.hideSpinner();
        localStorage.setItem('id_token', response.json().access_token);
        this.router.navigate(['home']);
      },
      error => {
        this.hideSpinner();
        alert((JSON.parse(error.text())).message);
        console.log(error.text());
      }
      );
  }

  register(event) {
    event.preventDefault();
    this.router.navigate(['register']);
  }
}
