import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Target } from '@performance-workshop/shared';

@Injectable({
  providedIn: 'root'
})
export class GridHttpService {

  public get(): Observable<Target[]> {
    return of([{ id: 'id', name: 'name', lan: 1, lng: 2 }] as Target[]);
  }

}
