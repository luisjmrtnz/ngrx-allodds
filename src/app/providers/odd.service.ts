import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/retryWhen';

import { Category, MatchRequest } from '../models/';


const API = 'http://46.166.162.185:10500/ws.asmx';
//const API = 'http://190.10.11.184:10400/soccersodds.asmx';

@Injectable()

export class OddService {

    constructor(private http: Http) {}

    getCategories() {
        return this.http
            .get(`${API}/getCategories`)
            .map((response: Response) => this.getCategoriesFromXML(response))
            /* Adding selected property for the checkboxes */
            .map((categories: Category[]) => categories.map(cat => Object.assign({}, cat, { selected: false })))
            .retryWhen((errors) => errors.delay(8000))
            .catch((error: any) => Observable.throw(error.json()));
    }

    getMatches(requestMatch) {
        let headers = new Headers({
            'Content-type': 'application/json'
        });

        let options = new RequestOptions({
            headers: headers
        });

        return this.http
            .post(`${API}/getMatches`, requestMatch, options)
            .take(1)
            .map( res => res.json().d)
            .map(data =>  { 
                let newData = JSON.parse(data).Data;
                return newData;
            })
            .catch((error: any) => Observable.throw(error.json()));
    }

  /*  getMatchStream(requestMatch) {
         return Observable.timer(0,15000)
            .switchMap(() => this.getMatches(requestMatch))
            .share()
            .publishReplay(1)        
            .refCount();
    }*/

    getMatchArray(requests: MatchRequest[], $stop: Observable<any>) {
            const req = requests.map(req => this.getMatches(req));
            const ob = Observable.forkJoin(req);

            return Observable.timer(0, 15000)
                .takeUntil($stop)
                .switchMap(() => ob);
    }

    getCategoriesFromXML(response: Response) {
    /* Getting the data from the XML Response */
      let data = response.text();
      let firstPoint = data.indexOf('{');
      let lastPoint = data.lastIndexOf('}') + 1;
      return JSON.parse(data.slice(firstPoint, lastPoint)).Data;
    }
}