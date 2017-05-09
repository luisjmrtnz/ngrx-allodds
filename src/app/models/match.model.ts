export interface Match {
    match_id: number,
    category_name: string,
    date_time: string,
    localteam_goals: number,
    localteam_name: string,
    stadium: string,
    status: string,
    visitorteam_goals: number,
    visitorteam_name: string,
    odds_threeway: ThreewayOdd[]
}

export interface ThreewayOdd {
    match_id: number
    bookmaker_name: string,
    odds: Odd[]
}

export interface Odd {
    odd_id: number,
    odd_name: string,
    odd_value: number
}

export interface MatchState {
    matches: Match[],
    threeway: ThreewayOdd[],
    date: string,
    loading: boolean,
}