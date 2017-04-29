import { Pipe, PipeTransform } from '@angular/core';

import { Category } from '../models';

@Pipe({
    name: 'searchFilter'
})

export class SearchFilterPipe implements PipeTransform {
    transform(items: Category[], query: string) {
        if(!query || query.trim() === '') {
            return items;
        }

       return items.filter((cat: Category) => cat.category_name.toLowerCase().includes(query.toLowerCase()));
    }
}