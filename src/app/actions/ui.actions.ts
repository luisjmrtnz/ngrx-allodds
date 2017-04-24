import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()

export class UIActions {
    static SHOW_LIST = 'SHOW_LIST';
    showList(): Action {
        return {
            type: UIActions.SHOW_LIST
        }
    }

    static CLOSE_LIST = 'CLOSE_LIST';
    closeList(): Action {
        return {
            type: UIActions.SHOW_LIST
        }
    }
}