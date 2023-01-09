import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationQuery, PaginationResult } from '../../core/models';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { AppUtils } from '../../core/utils';
import { StudentService } from 'src/app/core/serivices';
type Data = Record<string, any>[];

export type FetchProvider<T> = (
  query: PaginationQuery
) => Observable<PaginationResult<T>>;

interface IColumnOptions {
  title: string;
  key: string;
  class?: string;
  ellipsis?: boolean;
  width?: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() title!: string;
  @Input() public displayColumns: Column[] = [];
  @Input() public fetchProvider!: FetchProvider<Data>;
  @Output() clickAction = new EventEmitter<any>();
  allRecords!: number;
  listOfData: Data[] = [];
  displayData: readonly IColumnOptions[] = [];
  loading = false;
  pageSize = 3;
  pageAvailable = 50;
  dataA: any;
  rate = 5;
  max = 5;
  // currentPageDataChange($event: readonly Data[]): void {
  //   this.listOfData = $event;
  // }
  total?: number;
  allData: any;
  constructor(private _studentService: StudentService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._studentService
      .getAllCourses(new PaginationQuery(0, this.pageAvailable))
      .subscribe((data) => {
        this.allData = data.data;
        console.log(this.allData[0]);
        this.total = this.allData.length;
        console.log(this.total);
      });
  }
  clickedData?: any;
  onClick(curr: any) {
    this.clickedData = curr;
    console.log(curr);

    this.clickAction.emit(curr);
  }

  loadDataFromServer(query: PaginationQuery): void {
    this.loading = true;
    if (
      AppUtils.isNullOrUndefined(this.fetchProvider) ||
      typeof this.fetchProvider !== 'function'
    ) {
      throw new Error('fetchProvider must be observable with array of event');
    }
    this.loading = true;
    this.fetchProvider(query).subscribe((data) => {
      this.loading = false;
      this.allRecords = data.allRecords;
      this.listOfData = data.data;
    });
  }

  onQueryParamsChange(params: any): void {
    const { pageSize, pageIndex } = params;
    console.log(pageSize, pageIndex);

    const query = new PaginationQuery(pageIndex - 1, this.pageSize);
    console.log(this.pageSize);

    for (let i = 0; i < pageSize; i++) {
      this.listOfData[i] = this.allData[i];
    }
    //this.loadDataFromServer(query);
  }

  refresh() {
    this.loadDataFromServer(new PaginationQuery(0, this.pageSize));
  }
}

export class Column {
  key: string;
  title: string;
  width?: string;
  class?: string[] | string;
  ellipsis?: boolean;

  constructor(options: IColumnOptions) {
    this.key = options.key;
    this.title = options.title;
    this.width = options.width ?? '175px';
    this.class = options.class;
    this.ellipsis = options.ellipsis;
  }
}
