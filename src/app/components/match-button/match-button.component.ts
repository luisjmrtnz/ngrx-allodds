import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Category, MatchRequest } from '../../models';

@Component({
    selector: 'match-button',
    template: `
        <button class="btn btn-primary"
            (click)="onClick()">
            Search
        </button>
    `
})

export class MatchButtonComponent {
    @Input() categories: Category[];
    @Input() date: string;

    @Output() clicked = new EventEmitter<MatchRequest[]>();

    onClick() {
        let requests: MatchRequest[];
        if(this.categories.length > 0 && this.date) {
            requests = this.categories.map(cat => {
                return {
                    category_id: cat.category_id,
                    date_time: this.date
                }
            });

            this.clicked.emit(requests);
        }
    }
}