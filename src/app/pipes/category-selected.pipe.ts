import { Pipe, PipeTransform } from '@angular/core';

import { Category } from '../models';

@Pipe({
    name: 'selected'
})

export class CategorySelectedPipe implements PipeTransform {
    transform(items: Category[]) {
        return items.filter(x => x.selected);
    }
}