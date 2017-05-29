import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ThreewayOdd, Odd } from '../../models';

@Component({
    selector: 'bookmaker',
    templateUrl: './bookmaker.component.html',
    styleUrls: ['bookmaker.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BookmakerComponent {
    @Input() bookmakers;

    trackByName(bookmaker: ThreewayOdd){
        return bookmaker.bookmaker_name;
    }

    trackById(odd: Odd){
        return odd.odd_id;
    }
}