import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { MatchRequest, Match } from '../models';

@Injectable()

export class MatchesActions {
    static GET_MATCHES = 'GET_MATCHES';
    getMatches(matchRequests: MatchRequest[]): Action {
        return {
            type: MatchesActions.GET_MATCHES,
            payload: matchRequests
        }
    }
    
    static GET_MATCHES_SUCCESS = 'GET_MATCHES_SUCCESS';
    getMatchesSuccess(matches: Match[]): Action {
        return {
            type: MatchesActions.GET_MATCHES_SUCCESS,
            payload: matches
        }
    }

    static SET_DATE = 'SET_DATE';
    setDate(date: string): Action {
        return {
            type: MatchesActions.SET_DATE,
            payload: date
        }
    }

}