export interface Odds {
    h2h: {
      home: number | null;
      away: number | null;
      draw: number | null;
    };
  }
  
  export interface SportEvent {
    id: string;
    sport_key: string;
    sport_title: string;
    home_team: string;
    away_team: string;
    commence_time: string;
    bookmaker: string;
    odds: Odds;
  }
  
  export interface User {
    id: string;
    username: string;
    password: string;
  }