import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Match } from '../../models';

@Component({
    selector: 'match-table',
    templateUrl: 'match-table.component.html',
    styleUrls: ['match-table.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MatchTableComponent {
    @Input() matches;

    trackById(item: Match) {
        return item.match_id;
    }
}