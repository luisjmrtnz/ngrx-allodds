import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'bookmaker',
    templateUrl: './bookmaker.component.html',
    styleUrls: ['bookmaker.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BookmakerComponent {
    @Input() bookmakers;
}