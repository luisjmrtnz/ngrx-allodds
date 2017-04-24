import { Action } from '@ngrx/store';
import { UIActions } from '../actions';

export interface State {
    showList: boolean
}

export const initialState: State = { showList: false };

export function uiReducer(state = initialState, action: Action) {
    if(action && action.type) {
        switch(action.type) {
            case UIActions.SHOW_LIST: 
                return {
                    showList: !state.showList
                };
            case UIActions.CLOSE_LIST:
                return {
                    showList: false
                }
            default:
                return state;
        }
    }
}