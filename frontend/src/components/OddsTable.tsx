// frontend/src/components/OddsTable.tsx
import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, TableSortLabel, IconButton, Tooltip, Box, Chip, Typography,
  TablePagination
} from '@mui/material';
import {
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

interface OddsTableProps {
  events: SportEvent[];
  favorites: string[];
  onToggleFavorite: (eventId: string) => void;
}

type Order = 'asc' | 'desc';
type OrderByField = 'commence_time' | 'sport_title' | 'home_team' | 'home_odds' | 'away_odds' | 'draw_odds' | 'bookmaker';

const OddsTable: React.FC<OddsTableProps> = ({ events, favorites, onToggleFavorite }) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderByField>('commence_time');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Format date and time
  const formatDateTime = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get color based on odds value
  const getOddsColor = (odds: number | null): string => {
    if (odds === null) return 'text.disabled';
    if (odds < 1.5) return '#388e3c'; // High probability (green)
    if (odds < 3) return '#1976d2';   // Medium probability (blue)
    return '#d32f2f';                 // Low probability (red)
  };

  // Get sport icon based on sport key
  const getSportIcon = (sportKey: string) => {
    sportKey = sportKey.toLowerCase();
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

  // Handle sorting changes
  const handleRequestSort = (property: OrderByField) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Create sort handler for a specific property
  const createSortHandler = (property: OrderByField) => () => {
    handleRequestSort(property);
  };

  // Create comparator function for sorting
  const getComparator = <Key extends keyof any>(
    order: Order,
    orderBy: OrderByField
  ): (a: SportEvent, b: SportEvent) => number => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  // Descending comparator function
  function descendingComparator<T>(a: T, b: T, orderBy: OrderByField): number {
    let aValue, bValue;

    switch (orderBy) {
      case 'home_odds':
        aValue = a.odds?.h2h?.home || Number.MAX_VALUE;
        bValue = b.odds?.h2h?.home || Number.MAX_VALUE;
        break;
      case 'away_odds':
        aValue = a.odds?.h2h?.away || Number.MAX_VALUE;
        bValue = b.odds?.h2h?.away || Number.MAX_VALUE;
        break;
      case 'draw_odds':
        aValue = a.odds?.h2h?.draw || Number.MAX_VALUE;
        bValue = b.odds?.h2h?.draw || Number.MAX_VALUE;
        break;
      default:
        aValue = a[orderBy as keyof SportEvent];
        bValue = b[orderBy as keyof SportEvent];
    }

    if (bValue < aValue) {
      return -1;
    }
    if (bValue > aValue) {
      return 1;
    }
    return 0;
  }

  // Sort the events based on current ordering
  const sortedEvents = [...events].sort(getComparator(order, orderBy));
  
  // Handle pagination changes
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Get paginated data
  const paginatedEvents = sortedEvents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="oddsTable" size="medium">
          <TableHead>
            <TableRow sx={{ bgcolor: 'rgba(0,0,0,0.03)' }}>
              <TableCell width="40px"></TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'sport_title'}
                  direction={orderBy === 'sport_title' ? order : 'asc'}
                  onClick={createSortHandler('sport_title')}
                >
                  Sport
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'commence_time'}
                  direction={orderBy === 'commence_time' ? order : 'asc'}
                  onClick={createSortHandler('commence_time')}
                >
                  Date & Time
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ minWidth: 180 }}>
                <TableSortLabel
                  active={orderBy === 'home_team'}
                  direction={orderBy === 'home_team' ? order : 'asc'}
                  onClick={createSortHandler('home_team')}
                >
                  Matchup
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === 'home_odds'}
                  direction={orderBy === 'home_odds' ? order : 'asc'}
                  onClick={createSortHandler('home_odds')}
                >
                  Home
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === 'away_odds'}
                  direction={orderBy === 'away_odds' ? order : 'asc'}
                  onClick={createSortHandler('away_odds')}
                >
                  Away
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === 'draw_odds'}
                  direction={orderBy === 'draw_odds' ? order : 'asc'}
                  onClick={createSortHandler('draw_odds')}
                >
                  Draw
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'bookmaker'}
                  direction={orderBy === 'bookmaker' ? order : 'asc'}
                  onClick={createSortHandler('bookmaker')}
                >
                  Bookmaker
                </TableSortLabel>
              </TableCell>
              <TableCell width="60px"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEvents.map((event) => {
              const isFavorite = favorites.includes(event.id);
              const isLiveOrSoon = new Date(event.commence_time).getTime() - new Date().getTime() < 3600000; // 1 hour
              
              return (
                <TableRow 
                  key={event.id}
                  hover
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    bgcolor: isLiveOrSoon ? 'rgba(255, 243, 224, 0.4)' : 'inherit',
                  }}
                >
                  <TableCell>
                    <IconButton 
                      size="small" 
                      onClick={() => onToggleFavorite(event.id)}
                      color={isFavorite ? "error" : "default"}
                      sx={{ width: 28, height: 28 }}
                    >
                      {isFavorite ? 
                        <FavoriteIcon fontSize="small" /> : 
                        <FavoriteBorderIcon fontSize="small" />
                      }
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {getSportIcon(event.sport_key)}
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {event.sport_title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {isLiveOrSoon ? (
                      <Chip
                        label={isLiveOrSoon && new Date(event.commence_time) < new Date() ? 
                          "LIVE NOW" : "STARTING SOON"}
                        size="small"
                        color={isLiveOrSoon && new Date(event.commence_time) < new Date() ? 
                          "error" : "warning"}
                        sx={{ mr: 1 }}
                      />
                    ) : null}
                    <Typography variant="body2">
                      {formatDateTime(event.commence_time)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold">
                      {event.home_team} vs {event.away_team}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography 
                      variant="body2" 
                      fontWeight="bold" 
                      sx={{ color: getOddsColor(event.odds?.h2h?.home || null) }}
                    >
                      {event.odds?.h2h?.home?.toFixed(2) || 'N/A'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography 
                      variant="body2" 
                      fontWeight="bold" 
                      sx={{ color: getOddsColor(event.odds?.h2h?.away || null) }}
                    >
                      {event.odds?.h2h?.away?.toFixed(2) || 'N/A'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography 
                      variant="body2" 
                      fontWeight="bold" 
                      sx={{ color: getOddsColor(event.odds?.h2h?.draw || null) }}
                    >
                      {event.odds?.h2h?.draw?.toFixed(2) || '—'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={event.bookmaker} 
                      size="small" 
                      sx={{ 
                        bgcolor: 'rgba(0,0,0,0.05)',
                        '& .MuiChip-label': { px: 1, fontSize: '0.75rem' }
                      }} 
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="caption" color="text.secondary">
                      #{event.id.substring(0, 6)}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
            {paginatedEvents.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 6 }}>
                  <Typography variant="body1">No events found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={events.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default OddsTable;