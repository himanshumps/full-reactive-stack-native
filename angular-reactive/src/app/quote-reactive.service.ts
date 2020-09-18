import { Injectable } from '@angular/core';

import { Quote } from './quote';

import {Observable} from 'rxjs';

@Injectable()
export class QuoteReactiveService {

  url: string = 'http://movie-native-openjdk-app-native-team6.apps.cluster-7a59.7a59.example.opentlc.com/quotes-reactive';
  urlPaged: string = 'http://movie-native-openjdk-app-native-team6.apps.cluster-7a59.7a59.example.opentlc.com/quotes-reactive-paged';

  getQuoteStream(page?: number, size?: number): Observable<Quote> {
    return new Observable<Quote>((observer) => {
      let url = this.url;
      if (page != null) {
        url = this.urlPaged + '?page=' + page + '&size=' + size;
      }
      let eventSource = new EventSource(url);
      eventSource.onmessage = (event) => {
        console.debug('Received event: ', event);
        let json = JSON.parse(event.data);
        observer.next(new Quote(json['movieId'], json['movie'], json['plot']));
      };
      eventSource.onerror = (error) => {
        // readyState === 0 (closed) means the remote source closed the connection,
        // so we can safely treat it as a normal situation. Another way
        // of detecting the end of the stream is to insert a special element
        // in the stream of events, which the client can identify as the last one.
        if(eventSource.readyState === 0) {
          console.log('The stream has been closed by the server.');
          eventSource.close();
          observer.complete();
        } else {
          observer.error('EventSource error: ' + error);
        }
      }
    });
  }

}
