import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

import { Odd } from '../../models';

@Component({
    selector: 'odd-table',
    templateUrl: './odd-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('bookmakerChanges', [
            state('inactive', style({transform: 'translateX(0)'})),
            state('active', style({ transform: 'translateX(0)'})),
            transition('inactive => active, active => inactive', [
            animate(300, keyframes([
                style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
                style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
                style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
            ]))
            ])
        ])
    ]
})

export class OddTableComponent implements OnChanges {
    @Input() odds: Odd[];
    changes = 'inactive';

    trackById(odd: Odd) {
        return odd.odd_id;
    }

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            let chng = changes[propName];
            let cur  = JSON.stringify(chng.currentValue);
            let prev = JSON.stringify(chng.previousValue);

            if(prev && (cur !== prev)) {
                this.changes = (this.changes === 'inactive')? 'active' : 'inactive';
            }
        }
    }
}