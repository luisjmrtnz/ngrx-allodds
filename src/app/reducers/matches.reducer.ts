import { Action } from '@ngrx/store';
import { MatchesActions } from '../actions';

import { Match, MatchState } from '../models';

const initialState: MatchState = {
    matches: [],
    date: null,
    loading: false
}

export function matchesReducer(state = initialState, action: Action) {
    if(action && action.type) {
        switch(action.type) {
            case MatchesActions.GET_MATCHES: 
                return Object.assign({}, state, {
                    loading: true
                });
            case MatchesActions.GET_MATCHES_SUCCESS:
                return Object.assign({}, state, {
                    matches: action.payload,
                    loading: false
                });
            case MatchesActions.SET_DATE:
               const date = (action.payload !== '')? action.payload: null;
                return Object.assign({}, state, {
                    date: date
                });
            default:
                return state;
        }
    }
} 

export const getMatches = (state: MatchState) => state.matches.map((match: Match) => match.category_name);
