import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IMyOptions } from 'mydatepicker';

import { CategoriesActions, MatchesActions } from './actions';
import { Category, CategoryState, MatchState, Match } from './models';

export interface AppState {
  categories: CategoryState,
  matches: MatchState
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
  model: any;
  matches: Observable<Match[]>;
  date: Observable<string>;

  constructor(
    private store: Store<AppState>,
    private categoryActions: CategoriesActions,
    private matchActions: MatchesActions){}

  ngOnInit() {
    this.setDate();
    this.store.dispatch(this.categoryActions.loadCategories());
    this.categories = this.store.select(state => state.categories.list);
    this.loadingCategories = this.store.select(state => state.categories.loading);
    this.matches = this.store.select(state => state.matches.matches);
    this.date = this.store.select(state => state.matches.date);
  }

  onChecked(category: Category) {
    this.store.dispatch(this.categoryActions.select(category));
  }

  onClear() {
    this.store.dispatch(this.categoryActions.clearSelect());
  }

  onDateChanged($event) {
    let date = $event.value;
    this.store.dispatch(this.matchActions.setDate(date));
  }

  setDate(): void {
    // Set today date using the setValue function
      let date = new Date();
      this.model = {
        date: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate() 
          }
        };
    }

}
