import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IMyOptions, MyDatePicker } from 'mydatepicker';

import { CategoriesActions, MatchesActions } from './actions';
import { Category, CategoryState, MatchState, Match, MatchRequest, ThreewayOdd } from './models';
import { selectedCategories, getMatches } from './reducers';

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
  loadingMatches: Observable<boolean>;
  myDatePickerOptions: IMyOptions = {
    dateFormat: 'yyyy-mm-dd',
    height: '2.29rem'
  };
  model: any;
  matches: Observable<Match[]>;
  date: Observable<string>;
  selectedCategories: Observable<Category[]>;
  toggle: Observable<boolean>;
  loaded: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private categoryActions: CategoriesActions,
    private matchActions: MatchesActions){}

  ngOnInit() {
    this.setDate();
    this.store.dispatch(this.categoryActions.loadCategories());
    this.categories = this.store.select(state => state.categories.list);
    this.loadingCategories = this.store.select(state => state.categories.loading);
    this.matches = this.store.select(state => getMatches(state.matches));
    this.date = this.store.select(state => state.matches.date);
    this.selectedCategories = this.store.select(state => selectedCategories(state.categories));
    this.loadingMatches = this.store.select(state => state.matches.loading);
    this.toggle = this.store.select(state => state.categories.show);
    this.loaded = this.store.select(state => state.matches.loaded);
}

  onChecked(category: Category) {
    this.store.dispatch(this.categoryActions.select(category));
  }

  onClear() {
    this.store.dispatch(this.categoryActions.clearSelect());
  }

  onDateChanged(date: string) {
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

  searchMatches(matchRequests: MatchRequest[]) {
    if(matchRequests) {
      this.store.dispatch(this.matchActions.getMatches(matchRequests));
      this.onToggle(false);
    }
  }

  onToggle(toggle: boolean) {
    const t = (toggle !== null)? toggle: null;
    this.store.dispatch(this.categoryActions.toggleDropdown(t));
  }

  onClick(){
    this.onToggle(false);
  }
}
