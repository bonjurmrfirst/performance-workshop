import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromGrid from '../+state/grid.reducer';
import { Observable } from 'rxjs';
import { Target } from '@performance-workshop/shared';

@Component({
  selector: 'performance-workshop-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  public grid$: Observable<Target[]>;

  constructor(
    private store: Store<fromGrid.GridState>
  ) {}

  public ngOnInit(): void {
    this.grid$ = this.store.select(fromGrid.getGrid);
  }

}
