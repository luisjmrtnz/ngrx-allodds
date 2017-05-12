import { Action } from '@ngrx/store';
import { MatchesActions } from '../actions';

import { Match, MatchState, ThreewayOdd} from '../models';

const initialState: MatchState = {
    matches: [],
    date: null,
    loading: false, 
    loaded: false
}

export function matchesReducer(state = initialState, action: Action) {
    if(action && action.type) {
        switch(action.type) {
            case MatchesActions.GET_MATCHES: 
                return Object.assign({}, state, {
                    loading: true,
                    matches: [], 
                    loaded: false
                });
            case MatchesActions.GET_MATCHES_SUCCESS:
                const newMatches = [].concat(...action.payload);
                return Object.assign({}, state, {
                    matches: [...state.matches, ...newMatches],
                    loading: false,
                    loaded: true
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

export const getMatches = (state: MatchState) => state.matches;
