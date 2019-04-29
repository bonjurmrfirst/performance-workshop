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
import * as clone from 'clone';

@Component({
  selector: 'performance-workshop-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() public id: string;
  @Input() public grid: Target[];

  processedGrid: Target[];
  lastUpdatedAt: Date;
x;s;
  constructor() {}

  public ngOnInit(): void {
    this.lastUpdatedAt = new Date();

    this.processedGrid = clone(this.grid).sort(a => a.id === this.id ? -1 : 1);

    this.processedGrid[0].data.map((record, i, data) => i === 0 ? record : record + data[i - 1]);

    this.x = () => {
      setInterval(() => this.s = `Details of ${this.processedGrid.find(target => target.id === this.id).name} might be outdated. Last updated at ${this.lastUpdatedAt.toLocaleTimeString()}`, 1000);
    };

    window.addEventListener('scroll', this.x);
  }

  public ngOnDestroy(): void {
    document.removeEventListener('copy', this.x);
  }

}
