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

  private _id: string;

  @Input() public set id(id: string) {
    this._id = id;
    this.lastUpdatedAt = new Date();
  }

  public get id(): string {
    return this._id;
  }

  @Input() public grid: Target[];

  public processedGrid: Target[];
  public warningMsg: string;

  private lastUpdatedAt: Date;
  private onCopy: () => void = () => {
    console.log('A');
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.warningMsg = `Details of ${this.processedGrid.find(target => target.id === this.id).name} might be outdated. Last updated ${Math.round((new Date().getTime() - this.lastUpdatedAt.getTime()) / 1000)} seconds ago`;
      console.log('B');
    }, 1000);
  };
  private intervalId: any;

  public ngOnInit(): void {
    this.lastUpdatedAt = new Date();

    this.processedGrid = clone(this.grid).sort(a => a.id === this.id ? -1 : 1);

    this.processedGrid[0].data.map((record, i, data) => i === 0 ? record : record + data[i - 1]);

    document.addEventListener('copy', this.onCopy);
  }

  public ngOnDestroy(): void {
    window.removeEventListener('copy', this.onCopy);
    clearInterval(this.intervalId);
  }

}
