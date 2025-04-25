// Represents a sport (e.g., Football, Basketball)
export interface Sport {
  id: string; // Unique identifier for the sport
  name: string; // Name of the sport (e.g., "Football", "Basketball")
  key: string; // Unique key for the sport (required by SportFilter)
  title: string; // Title of the sport (required by SportFilter)
}

// Represents a sport event with odds
export interface SportEvent {
  id: string; // Unique identifier for the event
  name: string; // Name of the event (e.g., "Team A vs Team B")
  date: string; // Date of the event
  odds: {
    h2h: {
      home: number; // Odds for the home team
      away: number; // Odds for the away team
      draw: number; // Odds for a draw
    };
  };
}