import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Category } from '../../models';

@Component({
    selector: 'dropdown-button',
    templateUrl: 'dropdown-button.component.html'
})

export class DropdownButtonComponent {
    @Input() categories: Category[];
    @Input() loading:boolean;
    @Output() clicked = new EventEmitter<any>();
    @Output() clear = new EventEmitter<any>();
    @Output() close = new EventEmitter<any>();

    getButtonText() {
        return (this.loading) ? 'Loading Categories...': 'Select a Category';
    }
}