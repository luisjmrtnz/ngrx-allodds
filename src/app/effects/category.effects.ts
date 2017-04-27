import { Injectable } from '@angular/core';
import { Effect, toPayload, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { CategoriesActions } from '../actions';
import { OddService } from '../providers';
import { Category } from '../models';

@Injectable() 

export class CategoryEffects {
    constructor(
        private actions$: Actions,
        private api: OddService,
        private categoryActions: CategoriesActions
    ){}

    @Effect() loadCategories = this.actions$
        .ofType(CategoriesActions.LOAD_CATEGORIES)
        .switchMap(() => this.api.getCategories()
            .map((categories: Category[]) => this.categoryActions.loadCategoriesSuccess(categories))
            .catch(err => Observable.of(this.categoryActions.loadCategoriesFailure(err)))
        );
}