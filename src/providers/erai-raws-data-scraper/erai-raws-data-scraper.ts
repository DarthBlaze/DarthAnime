import { EraiRawsData } from "./../../models/erai-raws-data";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

@Injectable()
export class EraiRawsDataScraperProvider {
  constructor(public http: HttpClient) {
  }

  getData(href: string): Observable<Array<EraiRawsData>> {
    let headers = new HttpHeaders({ Route: href });
    let options = { headers: headers };
    return this.http.get<Array<EraiRawsData>>("https://darthanime.herokuapp.com/anime", options);
  }
}
