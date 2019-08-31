import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as _ from 'lodash';
import { Response } from './response.model';

import { isEmpty } from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class RequestService {

  constructor(private http: HttpClient, private httpClient: HttpClient) { }
  private handleError(error: HttpErrorResponse) {


      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,

        console.error(`Backend returned code ${error.status}, `, error);
      }
    // return an observable with a user-facing error message

    return throwError(error.error);
  }


  GET(URL, data) {
    URL = `${environment.api_url}${URL}`;

    let request, req = [];
    if (!isEmpty(data)) {
      const keys = Object.keys(data);
      if (keys && keys.length > 0) {
        req = keys.map(e => `${e}=${data[e]}`);
      }
      request = `${URL}?${req.join('&')}`;
    } else {
      request = URL;
    }

    return this.http.get<Response>(request)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }


  POST(URL, request) {
    URL = `${environment.api_url}${URL}`;
    return this.http.post<Response>(URL, request).pipe(
      catchError(this.handleError) // then handle the error
    );
  }

  PUT(URL, request) {
    URL = `${environment.api_url}${URL}`;
    return this.http.put<Response>(URL, request).pipe(
      catchError(this.handleError) // then handle the error
    );
  }

  DELETE(URL, data) {

    URL = `${environment.api_url}${URL}`;
    let request, req = [];
    if (!isEmpty(data)) {
      const keys = Object.keys(data);

      if (keys && keys.length > 0) {
        req = keys.map((e) => {
          if (_.isArray(data[e])) {
            data[e] = JSON.stringify(data[e]);
          }
          return `${e}=${data[e]}`;

        });
      }

      request = `${URL}?${req.join('&')}`;
    } else {
      request = URL;
    }
    return this.http.delete<Response>(request)
      .pipe(
        catchError(this.handleError) // then handle the error
      );
  }

}
