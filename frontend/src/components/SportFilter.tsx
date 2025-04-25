// frontend/src/components/SportFilter.tsx
import React from 'react';
import { 
  FormControl, RadioGroup, FormControlLabel, Radio, Box, 
  Typography, Chip, Avatar, Skeleton 
} from '@mui/material';
import {
  SportsSoccer as SoccerIcon,
  SportsBasketball as BasketballIcon,
  SportsFootball as FootballIcon,
  SportsBaseball as BaseballIcon,
  SportsRugby as RugbyIcon,
  SportsEsports as EsportsIcon,
  SportsHandball as HandballIcon,
  SportsTennis as TennisIcon,
  SportsVolleyball as VolleyballIcon,
  Casino as CasinoIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';

interface Sport {
  key: string;
  title: string;
}

interface SportFilterProps {
  sports: Sport[];
  selectedSport: string;
  onSportChange: (sport: string) => void;
}

const SportFilter: React.FC<SportFilterProps> = ({ sports, selectedSport, onSportChange }) => {
  // Loading state
  const isLoading = sports.length === 0;
  
  // Get icon based on sport key
  const getSportIcon = (sportKey: string) => {
    sportKey = sportKey.toLowerCase();
    
    if (sportKey.includes('soccer')) return <SoccerIcon fontSize="small" />;
    if (sportKey.includes('basketball')) return <BasketballIcon fontSize="small" />;
    if (sportKey.includes('football') || sportKey.includes('nfl')) return <FootballIcon fontSize="small" />;
    if (sportKey.includes('baseball') || sportKey.includes('mlb')) return <BaseballIcon fontSize="small" />;
    if (sportKey.includes('rugby')) return <RugbyIcon fontSize="small" />;
    if (sportKey.includes('tennis')) return <TennisIcon fontSize="small" />;
    if (sportKey.includes('volleyball')) return <VolleyballIcon fontSize="small" />;
    if (sportKey.includes('handball')) return <HandballIcon fontSize="small" />;
    if (sportKey.includes('esports')) return <EsportsIcon fontSize="small" />;
    return <CasinoIcon fontSize="small" />;
  };
  
  // Get color based on sport key
  const getSportColor = (sportKey: string): string => {
    sportKey = sportKey.toLowerCase();
    
    if (sportKey.includes('soccer')) return '#388e3c'; // Green
    if (sportKey.includes('basketball')) return '#f57c00'; // Orange
    if (sportKey.includes('football') || sportKey.includes('nfl')) return '#6a1b9a'; // Purple
    if (sportKey.includes('baseball') || sportKey.includes('mlb')) return '#d32f2f'; // Red
    if (sportKey.includes('rugby')) return '#1976d2'; // Blue
    if (sportKey.includes('tennis')) return '#00796b'; // Teal
    if (sportKey.includes('volleyball')) return '#5d4037'; // Brown
    if (sportKey.includes('handball')) return '#c2185b'; // Pink
    if (sportKey.includes('esports')) return '#283593'; // Indigo
    return '#455a64'; // Blue Grey
  };

  // Handle sport selection
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSportChange(event.target.value);
  };

  return (
    <Box>
      {isLoading ? (
        // Loading state
        <>
          <Skeleton variant="rectangular" height={32} sx={{ mb: 1, borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={32} sx={{ mb: 1, borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={32} sx={{ mb: 1, borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={32} sx={{ mb: 1, borderRadius: 1 }} />
        </>
      ) : (
        // Modern chip-based filter
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 1 
        }}>
          <Chip
            icon={<FilterListIcon />}
            label="All Sports"
            onClick={() => onSportChange('all')}
            color={selectedSport === 'all' ? 'primary' : 'default'}
            variant={selectedSport === 'all' ? 'filled' : 'outlined'}
            sx={{ 
              fontWeight: selectedSport === 'all' ? 'bold' : 'normal',
              '& .MuiChip-label': { px: 1 }
            }}
          />
          
          {sports.map((sport) => (
            <Chip
              key={sport.key}
              avatar={
                <Avatar 
                  sx={{ 
                    bgcolor: selectedSport === sport.key ? 
                      'white' : 
                      `${getSportColor(sport.key)}22`, // Transparent version of the color
                    color: selectedSport === sport.key ? 
                      getSportColor(sport.key) : 
                      getSportColor(sport.key)
                  }}
                >
                  {getSportIcon(sport.key)}
                </Avatar>
              }
              label={sport.title}
              onClick={() => onSportChange(sport.key)}
              sx={{
                bgcolor: selectedSport === sport.key ? 
                  getSportColor(sport.key) : 
                  'transparent',
                color: selectedSport === sport.key ? 'white' : 'inherit',
                border: selectedSport === sport.key ? 
                  'none' : 
                  `1px solid ${getSportColor(sport.key)}44`,
                fontWeight: selectedSport === sport.key ? 'bold' : 'normal',
                '&:hover': {
                  bgcolor: selectedSport === sport.key ? 
                    getSportColor(sport.key) : 
                    `${getSportColor(sport.key)}22`
                },
                '& .MuiChip-label': { px: 1 }
              }}
            />
          ))}
        </Box>
      )}
      
      {/* Alternative classic radio button filter (can be enabled if preferred) */}
      {/* 
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="sport-filter"
          name="sport-filter"
          value={selectedSport}
          onChange={handleChange}
        >
          <FormControlLabel 
            value="all" 
            control={<Radio size="small" />} 
            label="All Sports" 
          />
          
          {isLoading ? (
            <>
              <Skeleton height={32} sx={{ mt: 1 }} />
              <Skeleton height={32} />
              <Skeleton height={32} />
            </>
          ) : (
            sports.map((sport) => (
              <FormControlLabel
                key={sport.key}
                value={sport.key}
                control={<Radio size="small" />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mr: 1, color: getSportColor(sport.key) }}>
                      {getSportIcon(sport.key)}
                    </Box>
                    <Typography variant="body2">{sport.title}</Typography>
                  </Box>
                }
              />
            ))
          )}
        </RadioGroup>
      </FormControl>
      */}
    </Box>
  );
};

export default SportFilter;