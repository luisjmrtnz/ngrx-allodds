import { Component, Input } from '@angular/core';

import { Odd } from '../../models';

@Component({
    selector: 'odd-table',
    templateUrl: './odd-table.component.html'
})

export class OddTableComponent {
    @Input() odds: Odd[];

    trackById(odd: Odd) {
        return odd.odd_id;
    }
}