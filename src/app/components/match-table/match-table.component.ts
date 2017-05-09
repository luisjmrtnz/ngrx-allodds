import { Component, Input } from '@angular/core';

import { Match } from '../../models';

@Component({
    selector: 'match-table',
    templateUrl: 'match-table.component.html',
    styleUrls: ['match-table.component.css']
})

export class MatchTableComponent {
    @Input() matches;
}