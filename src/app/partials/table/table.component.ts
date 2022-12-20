import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {PaginationQuery, PaginationResult} from "../../core/models";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {AppUtils} from "../../core/utils";

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
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() title!: string;
  @Input() public displayColumns: Column[] = [];
  @Input() public fetchProvider!: FetchProvider<Data>;
  allRecords!: number
  listOfData: readonly Data[] = [];
  displayData: readonly IColumnOptions[] = [];
  loading = false;
  pageSize = 10

  currentPageDataChange($event: readonly Data[]): void {
    this.listOfData = $event;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  loadDataFromServer(query: PaginationQuery): void {
    this.loading = true;
    if (AppUtils.isNullOrUndefined(this.fetchProvider) || typeof this.fetchProvider !== 'function') {
      throw new Error('fetchProvider must be observable with array of event');
    }
    this.loading = true;
    this.fetchProvider(query).subscribe(data => {
      this.loading = false;
      this.allRecords = data.allRecords;
      this.listOfData = data.data;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, filter } = params;
    const query = new PaginationQuery(pageIndex-1, pageSize)
    filter.forEach((f) => {
      if(f.value) {
        query.addParams(f.key, f.value);
      }
    })
    this.loadDataFromServer(query);
  }

  refresh() {
    this.loadDataFromServer(new PaginationQuery(0, this.pageSize))
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
