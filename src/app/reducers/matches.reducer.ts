import { Action } from '@ngrx/store';
import { MatchesActions } from '../actions';

import { Match, MatchState, ThreewayOdd} from '../models';

const initialState: MatchState = {
    ids: [],
    matches: {},
    date: null,
    loading: false, 
    loaded: false
}

export function matchesReducer(state = initialState, action: Action) {
    if(action && action.type) {
        switch(action.type) {
            case MatchesActions.GET_MATCHES: 
                return Object.assign({}, state, {
                    ids: [],
                    loading: true,
                    matches: {}, 
                    loaded: false
                });
            case MatchesActions.GET_MATCHES_SUCCESS:
                /* Concadenate all the arrays of matches */
                const matches = [].concat(...action.payload);
                /* Mapping their IDs */
                const matchesIds = matches.map((match: Match) => match.match_id);
                /* Check if there are new ids to insert */
                const newIds = matchesIds.filter((id: number) => state.ids.indexOf(id) <= -1 );
                /* Creating the big object that has all the matches */ 
                const newMatches = matches.reduce((matches: { [match_id: number] : Match }, match: Match) => {
                    return Object.assign(matches, {
                        [match.match_id]: match
                    });
                }, {});

                return Object.assign({}, state, {
                    ids: [...state.ids, ...newIds],
                    matches: Object.assign({}, state.matches, newMatches),
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

export const getMatchesEntities = (state: MatchState) => state.matches;
export const getIds = (state: MatchState) => state.ids;

export const getAllMatches = (state: MatchState) => {
    const matches = getMatchesEntities(state);

    return getIds(state).map(id => matches[id]);
};
