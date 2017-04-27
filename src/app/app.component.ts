import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { CategoriesActions } from './actions';
import { Category, CategoryState } from './models';

export interface AppState {
  categories: CategoryState
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  categories: Observable<Category[]>;
  loadingList: Observable<boolean>;
  selectedList: Observable<Category[]>;

  constructor(
    private store: Store<AppState>,
    private categoryActions: CategoriesActions){}

  ngOnInit() {
    this.store.dispatch(this.categoryActions.loadCategories());
    this.categories = this.store.select(state => state.categories.list);
    this.loadingList = this.store.select(state => state.categories.loading);
    this.selectedList = this.store.select(state => state.categories.selected);
  }

  onChecked(category: Category) {
    this.store.dispatch(this.categoryActions.select(category));
  }

}
