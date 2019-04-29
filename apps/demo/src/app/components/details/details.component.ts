import {
  AfterViewInit,
  Component,
  ElementRef, Input,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromGrid from '../../+state/grid.reducer';
import { Subscription } from 'rxjs';
import { Target } from '@performance-workshop/shared';
import Dygraph from 'dygraphs';
import { getLiveUpdates } from '../../+state/grid.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'performance-workshop-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() public id: string;
  @Input() public grid: Target[];

  constructor(
    private store: Store<fromGrid.GridState>
  ) {}

  public ngOnInit(): void {
    this.store.pipe(
      select(fromGrid.getGrid),
      map(grid => {
        console.log('calc');
          const selectedTarget = grid.find(target => target.id === this.id);

          return selectedTarget.data.reduce(
            (accTotal, targetDataNumber) => accTotal += grid
              .filter(target => target.id !== this.id)
              .reduce((acc, target) => acc += target.data.filter(number => number === targetDataNumber).length, 0),
            0)
        }
      ))
      .subscribe(r => {
        setInterval(() => {
          console.log(r);
          console.log(this.grid);
        }, 1000);
      });
  }

  public ngOnDestroy(): void {

  }

}

/*
return selectedTarget.data.reduce(
            (accTotal, targetDataNumber) => accTotal += grid
              .filter(target => target.id !== this.id)
              .reduce((acc, target) => acc += target.data.filter(number => number === targetDataNumber).length, 0),
            0)
 */
