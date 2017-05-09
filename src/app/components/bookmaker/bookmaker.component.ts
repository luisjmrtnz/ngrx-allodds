import { Component, Input } from '@angular/core';

@Component({
    selector: 'bookmaker',
    templateUrl: './bookmaker.component.html',
    styleUrls: ['bookmaker.component.css']
})

export class BookmakerComponent {
    @Input() bookmakers;
}