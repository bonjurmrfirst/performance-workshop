import {
  AfterViewInit,
  Component,
  ElementRef,
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
import { memoize } from 'apps/demo/src/lib/memoize';

export const dygraphConfig = {
  axisLabelFontSize: 0,
  axisLabelWidth: 0,
  height: 10,
  width: 100,
  showLabelsOnHighlight: false
};

@Component({
  selector: 'performance-workshop-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit {

  @ViewChildren('graph') elements:QueryList<ElementRef>;

  public grid: Target[];
  public selectedTargetId: string;

  private liveUpdates: Target[];
  private gridSubscription: Subscription;

  constructor(
    private store: Store<fromGrid.GridState>
  ) {}

  public ngOnInit(): void {
    this.gridSubscription = this.store.select(fromGrid.getGrid)
      .subscribe(grid => {
        const t0 = performance.now();

        const memoizedGetCalculatedField = memoize(this.getCalculatedField);

        this.grid = grid.map(target => {
          target.index = memoizedGetCalculatedField(target.index);

          return target;
        });

        const t1 = performance.now();
        console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
    });

    this.store.pipe(select(getLiveUpdates), map(liveUpdates => liveUpdates.slice(-1)[0]))
      .subscribe(liveUpdates => this.liveUpdates = liveUpdates);
  }

  public ngAfterViewInit(): void {
    this.elements.changes
      .subscribe(() => {console.log(this.grid);
        this.elements.toArray().forEach(((element, i) => {
          new Dygraph(
            element.nativeElement,
            this.grid[i].chart,
            dygraphConfig
          );
        }))
      });
  }

  public getCalculatedField(calcField: number): number {
    function fibonacci(num) {
      let n1 = 1;
      let n2 = 1;

      for (var i = 3; i <= num; i++) {
        const sum = n1 + n2;
        n1 = n2;
        n2 = sum;
      }

      return n2;
    }

    return fibonacci(calcField);
  }

  public isHighlighted(id: string): boolean {
    if (!this.liveUpdates) {
      return;
    }

    return this.liveUpdates.some(item => item.id === id);
  }

  public onTargetClick(id: string): void {
    if (id === this.selectedTargetId) {
      this.selectedTargetId = null;

      return;
    }

    this.selectedTargetId = id;
  }

}
