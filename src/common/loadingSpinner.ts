import { Component } from '@angular/core';
import { Spinner } from '../spinner';

@Component({
  providers: [ Spinner ],
})
export default class LoadingSpinner {
    public loading: Boolean;

    showSpinner() {
        this.loading = true;
    }

    hideSpinner() {
        this.loading = false;
    }
}
