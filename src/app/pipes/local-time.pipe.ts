import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'localtimePipe'
})

export class LocalTimePipe implements PipeTransform{
    transform(time: string, date: string, which: string) {
        const utc = moment.utc(`${date} ${time}`, 'YYYY-MM-DD h:mm');
        const local = utc.local();

        return (which === 'time')? local.format('h:mm A'): local.format('YYYY-MM-DD'); 
    }
}