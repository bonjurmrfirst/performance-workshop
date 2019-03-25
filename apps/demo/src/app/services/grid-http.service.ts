import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Target } from '@performance-workshop/shared';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GridHttpService {

  constructor(private httpClient: HttpClient) {}

  public get(): Observable<Target[]> {

    return this.httpClient.get('api/targets').pipe(
      map(targets => targets as Target[])
    );
  }

}
