import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { Category } from '../../models';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Input() loading: boolean;
  @Input() categories: Category[];
  @Input() showList: boolean;
  @Input() selected: Category[];
  @Output() checked = new EventEmitter<Category>();
  term = new FormControl();
  filterCategories: Category[];

  constructor() { }

  ngOnInit() {
    this.term.valueChanges
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe(term => this.onSearch(term));
  }

  initFilter() {
    this.filterCategories = this.categories;
  }

  show() {
    this.showList = !this.showList;
    if(!this.filterCategories){
      this.initFilter();
    }
  }

  getButtonText() {
    return (this.loading) ? 'Loading Categories...': 'Select a Category';
  }

  onKeyUp($event) {
    if($event.key === 'Escape'){
      this.showList = false;
    }
  }

  onSearch(query: string) {
    this.initFilter();

    if(!query || query.trim() === '') {
          return;
    }

    this.filterCategories = this.filterCategories.filter((cat: Category) => {
        if(cat.category_name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
            return true;
        }
        return false;
      });
  }

  onChecked(category: Category) {
    this.checked.emit(category);
  }

}
