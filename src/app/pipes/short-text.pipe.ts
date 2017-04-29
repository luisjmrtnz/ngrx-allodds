import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shortText'
})

export class ShortTextPipe implements PipeTransform {
    transform(text: string) {
        return (text.length > 40)? `${text.slice(0, 40)}...` : text;
    }
}