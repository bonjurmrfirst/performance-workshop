import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
  HostListener,
  ViewChild
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromGrid from '../../+state/grid.reducer';
import { Subscription, fromEvent } from 'rxjs';
import { Target } from '@performance-workshop/shared';
import Dygraph from 'dygraphs';
import { getLiveUpdates } from '../../+state/grid.reducer';
import { map, throttle, throttleTime } from 'rxjs/operators';

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

  @ViewChildren('graph') elements: QueryList<ElementRef>;
  @ViewChild('table') table: ElementRef;

  public grid: Target[];
  public selectedTargetId: string;

  private liveUpdates: Target[];
  private gridSubscription: Subscription;
  private scrollSubscription: Subscription;

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
    this.scrollSubscription = fromEvent(window, 'scroll').pipe(
      throttleTime(500)
    ).subscribe(() => {
        console.log(Math.abs(Math.trunc(this.table.nativeElement.getBoundingClientRect().top / 32)));
      });

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

  public onTargetClick(id: string): void {
    if (id === this.selectedTargetId) {
      this.selectedTargetId = null;

      return;
    }

    this.selectedTargetId = id;
  }

  ngOnDestroy(): void {
    this.scrollSubscription.unsubscribe();
  }

}
