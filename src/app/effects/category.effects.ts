import { Injectable } from '@angular/core';
import { Effect, toPayload, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

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
        );
}