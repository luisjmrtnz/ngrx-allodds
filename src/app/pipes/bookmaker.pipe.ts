import { Pipe, PipeTransform } from '@angular/core';

import { ThreewayOdd, Match } from '../models';

@Pipe({
    name: 'bookmakerPipe'
})

export class BookmakerPipe implements PipeTransform{
    transform(match: Match) {
        console.log(match.odds_threeway);
        return match.odds_threeway;
    }
}