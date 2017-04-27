import { Action  } from '@ngrx/store';

import { CategoriesActions } from '../actions';
import { Category, CategoryState } from '../models';

const initialState: CategoryState = {
    list: [],
    selected: [],
    loading: false
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
                const exists = state.selected.find(cat => cat.category_id === action.payload.category_id);
                let filtered: Category[];
                if(exists) {
                    filtered = state.selected.filter(cat => cat.category_id !== action.payload.category_id);
                } else {
                    filtered = [...state.selected, ...action.payload];
                }

                return Object.assign({}, state, {
                    selected: filtered
                });
            default:
                return state;
        }
    }
};