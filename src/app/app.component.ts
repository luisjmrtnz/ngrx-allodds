import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IMyOptions } from 'mydatepicker';

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
  loadingCategories: Observable<boolean>;
  myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
    height: '2.29rem'
  };
  model;

  constructor(
    private store: Store<AppState>,
    private categoryActions: CategoriesActions){}

  ngOnInit() {
    this.setDate();
    this.store.dispatch(this.categoryActions.loadCategories());
    this.categories = this.store.select(state => state.categories.list);
    this.loadingCategories = this.store.select(state => state.categories.loading);
  }

  onChecked(category: Category) {
    this.store.dispatch(this.categoryActions.select(category));
  }

  onClear() {
    this.store.dispatch(this.categoryActions.clearSelect());
  }

  onDateChanged($event) {
    console.log($event);
  }

  setDate(): void {
    // Set today date using the setValue function
      let date = new Date();
      this.model = {
        date: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()}
        };
    }
}
