import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

const styles = require('./spinner.css');
const template = require('./spinner.html');

@Component({
  selector: 'spinner',
  template: template,
  styles: [styles]
})
export class Spinner {
  @Input()
  public loading: boolean = false;

}
