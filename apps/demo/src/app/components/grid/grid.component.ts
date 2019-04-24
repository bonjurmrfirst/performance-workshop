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

  public grid: Target[];
  private liveUpdates: Target[];

  @ViewChildren('graph') elements:QueryList<ElementRef>;

  private gridSubscription: Subscription;

  constructor(
    private store: Store<fromGrid.GridState>
  ) {}

  public ngOnInit(): void {
    this.gridSubscription = this.store.select(fromGrid.getGrid)
      .subscribe(grid => this.grid = grid);

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

  public getCalcField(calcField: number): number {console.log(calcField)
    function fibonacci(num) {
      if (num <= 1) return 1;

      return fibonacci(num - 1) + fibonacci(num - 2);
    }

    return fibonacci(calcField);
  }

  public isHighlighted(id: string): boolean {
    if (!this.liveUpdates) {
      return;
    }

    return this.liveUpdates.some(item => item.id === id);
  }

}
