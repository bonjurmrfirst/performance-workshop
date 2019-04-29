import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromGrid from './+state/grid.reducer';
import { LoadGrid } from './+state/grid.actions';
import { LiveUpdateService } from './services/live-update.service';
import { select } from '@ngrx/store';
import { getIsLoaded } from './+state/grid.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'performance-workshop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isLoaded$: Observable<boolean>;

  constructor(
    private store: Store<fromGrid.GridState>,
    private liveUpdateService: LiveUpdateService
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(new LoadGrid());

    this.liveUpdateService.getMessages().subscribe(message => {
      console.log(message);
    });

    this.isLoaded$ = this.store.pipe(select(getIsLoaded));
  }

}
