import { Action } from '@ngrx/store';

import { CategoriesActions } from '../actions';
import { Category, CategoryState } from '../models';

const initialState: CategoryState = {
    list: [],
    loading: false,
    show: false
}

export function categoryReducer(state = initialState, action: Action) {
    if(action && action.type){
        switch(action.type) {
            case CategoriesActions.LOAD_CATEGORIES: 
                return Object.assign({}, state, {
                    loading: true
                });
            case CategoriesActions.LOAD_CATEGORIES_SUCCESS:
                return Object.assign({}, state , {
                    list: [...state.list, ...action.payload],
                    loading: false
                });
            case CategoriesActions.SELECT: 
                const id = action.payload.category_id;
                const selected = state.list.map(cat => (cat.category_id === id)? Object.assign({}, cat, { selected: !cat.selected }) : cat );
                return Object.assign({}, state, {
                   list: selected
                });
            case CategoriesActions.CLEAR_SELECT:
                return Object.assign({}, state, {
                    list: state.list.map(x => Object.assign({}, x, { selected: false }))
                });
            case CategoriesActions.TOGGLE_DROPDOWN:
                const toggle: boolean = action.payload;
                return Object.assign({}, state, {
                    show: (toggle !== null)? toggle: !state.show
                });
            default:
                return state;
        }
    }
};

export const selectedCategories = (state: CategoryState) => state.list.filter(cat => cat.selected);