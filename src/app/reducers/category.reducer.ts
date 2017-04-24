import { Action  } from '@ngrx/store';

import { CategoriesActions } from '../actions';
import { Category, CategoryState } from '../models';

const initialState: CategoryState = {
    list: [],
    selected: null
}

export function categoryReducer(state = initialState, action: Action) {
    if(action && action.type){
        switch(action.type) {
            case CategoriesActions.LOAD_CATEGORIES_SUCCESS:
                return {
                    list: [...state.list, ...action.payload],
                    selected: state.selected
                };
            case CategoriesActions.SELECT: 
                return {
                    list: state.list,
                    selected: action.payload
                }
            default:
                return state;
        }
    }
};