// frontend/src/components/OddsCard.tsx
import React from 'react';
import { 
  Card, CardContent, CardActions, Typography, Box, Chip, 
  IconButton, Tooltip, Divider, LinearProgress
} from '@mui/material';
import { 
  AccessTime as TimeIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  SportsSoccer as SoccerIcon,
  SportsBasketball as BasketballIcon,
  SportsFootball as FootballIcon,
  SportsBaseball as BaseballIcon,
  SportsRugby as RugbyIcon,
  SportsEsports as EsportsIcon,
  SportsHandball as HandballIcon,
  SportsTennis as TennisIcon,
  SportsVolleyball as VolleyballIcon,
  Casino as CasinoIcon
} from '@mui/icons-material';

interface Odds {
  h2h: {
    home: number | null;
    away: number | null;
    draw: number | null;
  };
}

interface SportEvent {
  id: string;
  sport_key: string;
  sport_title: string;
  home_team: string;
  away_team: string;
  commence_time: string;
  bookmaker: string;
  odds: Odds;
}

interface OddsCardProps {
  event: SportEvent;
  isFavorite: boolean;
  onToggleFavorite: (eventId: string) => void;
}

const OddsCard: React.FC<OddsCardProps> = ({ event, isFavorite, onToggleFavorite }) => {
  // Format match time
  const formatMatchTime = (): string => {
    const eventDate = new Date(event.commence_time);
    return eventDate.toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Calculate time until match
  const getTimeUntilMatch = (): { text: string, isPast: boolean, percentRemaining: number } => {
    const now = new Date();
    const eventDate = new Date(event.commence_time);
    const diffMs = eventDate.getTime() - now.getTime();
    const isPast = diffMs < 0;
    
    if (isPast) {
      return { text: 'In Progress', isPast: true, percentRemaining: 0 };
    }
    
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours < 1) {
      return { 
        text: `Starting in ${diffMinutes} min`, 
        isPast: false,
        percentRemaining: (diffMinutes / 60) * 100
      };
    } else if (diffHours < 24) {
      return { 
        text: `Starting in ${diffHours}h ${diffMinutes}m`, 
        isPast: false,
        percentRemaining: (diffHours / 24) * 100
      };
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return { 
        text: `${diffDays} days away`, 
        isPast: false,
        percentRemaining: 100
      };
    }
  };
  
  // Get color based on odds value
  const getOddsColor = (odds: number | null): string => {
    if (odds === null) return 'text.disabled';
    if (odds < 1.5) return '#388e3c'; // High probability (green)
    if (odds < 3) return '#1976d2';   // Medium probability (blue)
    return '#d32f2f';                 // Low probability (red)
  };
  
  // Get sport icon based on sport key
  const getSportIcon = () => {
    const sportKey = event.sport_key.toLowerCase();
    let Icon;
    
    if (sportKey.includes('soccer')) Icon = SoccerIcon;
    else if (sportKey.includes('basketball')) Icon = BasketballIcon;
    else if (sportKey.includes('football') || sportKey.includes('nfl')) Icon = FootballIcon;
    else if (sportKey.includes('baseball') || sportKey.includes('mlb')) Icon = BaseballIcon;
    else if (sportKey.includes('rugby')) Icon = RugbyIcon;
    else if (sportKey.includes('tennis')) Icon = TennisIcon;
    else if (sportKey.includes('volleyball')) Icon = VolleyballIcon;
    else if (sportKey.includes('handball')) Icon = HandballIcon;
    else if (sportKey.includes('esports')) Icon = EsportsIcon;
    else Icon = CasinoIcon;
    
    return <Icon fontSize="small" />;
  };

  const timeInfo = getTimeUntilMatch();
  const progressColor = timeInfo.isPast ? 'error' : 
                        timeInfo.percentRemaining < 25 ? 'warning' : 'primary';

  return (
    <Card sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      borderRadius: 2,
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
      }
    }}>
      {/* Sport tag and time */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        bgcolor: 'primary.main',
        color: 'white',
        p: 1,
        pl: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {getSportIcon()}
          <Typography variant="body2" sx={{ ml: 1, fontWeight: 'medium' }}>
            {event.sport_title}
          </Typography>
        </Box>
        
        <Tooltip title={formatMatchTime()}>
          <Chip 
            icon={<TimeIcon sx={{ fontSize: '16px !important', color: 'inherit' }} />}
            label={timeInfo.text}
            size="small"
            sx={{ 
              height: 24,
              bgcolor: timeInfo.isPast ? 'error.main' : 'rgba(255,255,255,0.2)',
              color: 'white',
              '& .MuiChip-label': { px: 1, fontSize: '0.75rem' }
            }}
          />
        </Tooltip>
      </Box>
      
      {/* Progress bar for time until match */}
      {!timeInfo.isPast && (
        <LinearProgress 
          variant="determinate" 
          value={100 - timeInfo.percentRemaining}
          color={progressColor}
          sx={{ height: 4 }}
        />
      )}
      
      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        {/* Teams */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {event.home_team}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 'bold', 
                color: getOddsColor(event.odds?.h2h?.home || null)
              }}
            >
              {event.odds?.h2h?.home?.toFixed(2) || 'N/A'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {event.away_team}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 'bold', 
                color: getOddsColor(event.odds?.h2h?.away || null)
              }}
            >
              {event.odds?.h2h?.away?.toFixed(2) || 'N/A'}
            </Typography>
          </Box>
          
          {/* Draw odds (if available) */}
          {event.odds?.h2h?.draw !== null && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Draw
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: getOddsColor(event.odds?.h2h?.draw || null)
                }}
              >
                {event.odds?.h2h?.draw?.toFixed(2) || 'N/A'}
              </Typography>
            </Box>
          )}
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Chip 
            label={event.bookmaker} 
            size="small" 
            sx={{ 
              bgcolor: 'rgba(0,0,0,0.05)',
              '& .MuiChip-label': { px: 1, fontSize: '0.75rem' }
            }} 
          />
          <Typography variant="caption" color="text.secondary">
            ID: {event.id.substring(0, 8)}...
          </Typography>
        </Box>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'flex-end', p: 1, bgcolor: 'rgba(0,0,0,0.02)' }}>
        <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
          <IconButton 
            size="small" 
            onClick={() => onToggleFavorite(event.id)}
            color={isFavorite ? "error" : "default"}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default OddsCard;