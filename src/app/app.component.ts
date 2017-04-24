import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { CategoriesActions, UIActions } from './actions';
import { Category, CategoryState } from './models';

export interface AppState {
  categories: CategoryState
  ui: {
    showList: boolean
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  categories;
  category;
  showList;

  constructor(
    private store: Store<AppState>,
    private categoryActions: CategoriesActions,
    private ui: UIActions){}

  ngOnInit() {
    this.store.dispatch(this.categoryActions.loadCategories());
    this.categories = this.store.select(state => state.categories.list);
    this.category = this.store.select(state => state.categories.selected);
    this.showList = this.store.select(state => state.ui.showList);
  }

  onSelected(x: Category) {
    this.store.dispatch(this.categoryActions.select(x));
    this.store.dispatch(this.ui.closeList());
  } 

  onShow() {
    this.store.dispatch(this.ui.showList());
  }
}
