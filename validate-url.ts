import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/timeout'
import { Subscription } from 'rxjs/Subscription'

@Injectable()
export class ValidateUrlProvider {
  private validateUrlObservable: Subscription

  constructor(public http: Http) {}

  validateUrl(url, callback?: Function, callbackError?: Function): any {
    this.validateUrlObservable = this.http
      .get(url)
      .timeout(15000)
      .subscribe(
        data => {
          if (callback) callback(data['status'])
        },
        error => {
          if (callbackError) callbackError(error)
        }
      )
  }

  closeObservables(): any {
    this.validateUrlObservable.unsubscribe()
  }
}
