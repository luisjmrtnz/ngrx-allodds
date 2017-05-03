import { Injectable } from '@angular/core';
import { Effect, toPayload, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { MatchesActions } from '../actions';
import { OddService } from '../providers';
import { Match, MatchRequest } from '../models';

@Injectable() 

export class MatchEffects {
    constructor(
        private actions$: Actions,
        private api: OddService,
        private matchActions: MatchesActions
    ){}

    @Effect() loadMatchess = this.actions$
        .ofType(MatchesActions.GET_MATCHES)
        .map(toPayload)
        .switchMap((request: MatchRequest) => this.api.getMatchStream(request))
        .map((matches: Match[]) => this.matchActions.getMatchesSuccess(matches));
}