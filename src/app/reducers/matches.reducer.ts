import { Action } from '@ngrx/store';
import { MatchesActions } from '../actions';

import { Match, MatchState, ThreewayOdd} from '../models';

const initialState: MatchState = {
    matches: [],
    date: null,
    loading: false,
    threeway: []
}

export function matchesReducer(state = initialState, action: Action) {
    if(action && action.type) {
        switch(action.type) {
            case MatchesActions.GET_MATCHES: 
                return Object.assign({}, state, {
                    loading: true
                });
            case MatchesActions.GET_MATCHES_SUCCESS:
                const m = [].concat(...action.payload);
                const threeway = m.map((m: Match) =>  {
                   return m.odds_threeway.map((t: ThreewayOdd) => { 
                            return Object.assign({}, t, { 
                                match_id: m.match_id 
                            });
                        });
                });
                return Object.assign({}, state, {
                    matches: m,
                    loading: false,
                    threeway: [].concat(...threeway)
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
