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
    select(category: Category): Action {
        return {
            type: CategoriesActions.SELECT,
            payload: category
        }
    }

    static CLEAR_SELECT = 'CLEAR_SELECT';
    clearSelect(): Action {
        return {
            type: CategoriesActions.CLEAR_SELECT
        }
    }
    static TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN';
    toggleDropdown(toggle: boolean): Action {
        return {
            type: CategoriesActions.TOGGLE_DROPDOWN,
            payload: toggle
        }
    }
}