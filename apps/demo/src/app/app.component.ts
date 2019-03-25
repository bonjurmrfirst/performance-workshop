import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromGrid from './+state/grid.reducer';
import { LoadGrid } from './+state/grid.actions';

@Component({
  selector: 'performance-workshop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<fromGrid.GridState>) {}

  public ngOnInit(): void {
    this.store.dispatch(new LoadGrid());
  }

}
