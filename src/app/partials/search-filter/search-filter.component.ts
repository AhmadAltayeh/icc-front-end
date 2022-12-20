import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {
  @Output() filter = new EventEmitter()
  search = '';
  constructor() { }

  ngOnInit(): void {
  }

  getFilters() {
    return this.search
  }

}
