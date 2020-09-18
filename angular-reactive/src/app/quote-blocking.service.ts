import { Injectable } from '@angular/core';

import { Quote } from './quote';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class QuoteBlockingService {

  url: string = 'http://movie-native-openjdk-app-native-team6.apps.cluster-7a59.7a59.example.opentlc.com/quotes-blocking';
  urlPaged: string = 'http://movie-native-openjdk-app-native-team6.apps.cluster-7a59.7a59.example.opentlc.com/quotes-blocking-paged';

  constructor(private http: HttpClient) {}

  getQuotes(page?: number, size?: number): Observable<Array<Quote>> {
    let url = this.url;
    if (page != null) {
      url = this.urlPaged + '?page=' + page + '&size=' + size;
    }
    return this.http.get<Array<Quote>>(url);
  }
}
