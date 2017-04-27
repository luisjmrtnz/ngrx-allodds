import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Category } from '../models';

@Injectable()

export class CategoriesActions {
    static LOAD_CATEGORIES = 'LOAD_CATEGORIES';
    loadCategories(): Action {
        return {
            type: CategoriesActions.LOAD_CATEGORIES
        }
    }

    static LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS';
    loadCategoriesSuccess(categories: Category[]): Action {
        return {
            type: CategoriesActions.LOAD_CATEGORIES_SUCCESS,
            payload: categories
        }
    }

    static LOAD_CATEGORIES_FAILURE = 'LOAD_CATEGORIES_FAILURE';
    loadCategoriesFailure(err: any): Action {
        return {
            type: CategoriesActions.LOAD_CATEGORIES_FAILURE,
            payload: err
        }
    }

    static SELECT = 'SELECT';
    select(category: Category) : Action {
        return {
            type: CategoriesActions.SELECT,
            payload: category
        }
    }
}