import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Target } from '@performance-workshop/shared';
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
  private intervalId: any;

  public ngOnInit(): void {
    this.lastUpdatedAt = new Date();

    this.processedGrid = clone(this.grid).sort(a => a.id === this.id ? -1 : 1);

    this.processedGrid[0].data.map((record, i, data) => i === 0 ? record : record + data[i - 1]);

    document.addEventListener('copy', () => {
      clearInterval(this.intervalId);

      this.intervalId = setInterval(() => {
        const name = this.processedGrid.find(target => target.id === this.id).name;
        const expirationTime = Math.round((new Date().getTime() - this.lastUpdatedAt.getTime()) / 1000);

        this.warningMsg = `Details of ${name} might be outdated. Last updated ${expirationTime} seconds ago`;
      }, 1000);
    });
  }

}
