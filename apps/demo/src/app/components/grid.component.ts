import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromGrid from '../+state/grid.reducer';
import { Subscription } from 'rxjs';
import { Target } from '@performance-workshop/shared';
import Dygraph from 'dygraphs';

export const dygraphConfig = {
  axisLabelFontSize: 0,
  axisLabelWidth: 0,
  height: 30,
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

  @ViewChildren('graph') elements:QueryList<ElementRef>;

  private gridSubscription: Subscription;

  constructor(
    private store: Store<fromGrid.GridState>
  ) {}

  public ngOnInit(): void {
    this.gridSubscription = this.store.select(fromGrid.getGrid)
      .subscribe(grid => this.grid = grid);
  }

  public ngAfterViewInit(): void {
    this.elements.changes
      .subscribe(() => {
        console.log((this as any).elements.toArray()[0].nativeElement);

        this.elements.toArray().forEach(((element, i) => {
          new Dygraph(
            element.nativeElement,
            this.grid[i].chart,
            dygraphConfig
          );
        }))
      });
  }

}
