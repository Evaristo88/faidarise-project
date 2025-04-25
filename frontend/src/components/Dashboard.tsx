// frontend/src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { 
  Card, CardContent, Typography, Button, Chip, IconButton, 
  Tooltip, Menu, MenuItem, Badge, AppBar, Toolbar, Drawer, 
  Divider, List, ListItem, ListItemIcon, ListItemText, 
  Avatar, Box, useMediaQuery, useTheme, CircularProgress,
  Alert, AlertTitle, Paper, Tab, Tabs
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  Tune as TuneIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Favorite as FavoriteIcon,
  FilterList as FilterListIcon,
  Dashboard as DashboardIcon,
  Sports as SportsIcon,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';

import SportFilter from './SportFilter';
import OddsTable from './OddsTable';
import OddsCard from './OddsCard';
import { getAllOdds, getAvailableSports, getOddsBySport, logout } from '../services/api';

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

interface Sport {
  key: string;
  title: string;
}

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [events, setEvents] = useState<SportEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<SportEvent[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [viewMode, setViewMode] = useState<string>('grid');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(!isMobile);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  
  // Toggle for drawer in mobile view
  useEffect(() => {
    setDrawerOpen(!isMobile);
  }, [isMobile]);

  // Load data on component mount
  useEffect(() => {
    console.log('Dashboard: Component mounted, fetching initial data');
    fetchOddsData();
    fetchSportsData();
    
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteEvents');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Set up polling for data refresh (every 5 minutes)
    const intervalId = setInterval(() => {
      console.log('Auto-refreshing data...');
      fetchOddsData(true);
    }, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Apply filters whenever events or filters change
  useEffect(() => {
    filterEvents();
  }, [events, selectedSport, activeTab, favorites]);

  // Filter events based on current filters
  const filterEvents = (): void => {
    let filtered = [...events];
    
    // Apply sport filter
    if (selectedSport !== 'all') {
      filtered = filtered.filter(event => event.sport_key === selectedSport);
    }
    
    // Apply tab filter (All, Today, Favorites)
    if (activeTab === 1) {
      // Today's events
      const today = new Date().setHours(0, 0, 0, 0);
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.commence_time).setHours(0, 0, 0, 0);
        return eventDate === today;
      });
    } else if (activeTab === 2) {
      // Favorite events
      filtered = filtered.filter(event => favorites.includes(event.id));
    }
    
    // Sort by commence time
    filtered.sort((a, b) => 
      new Date(a.commence_time).getTime() - new Date(b.commence_time).getTime()
    );
    
    setFilteredEvents(filtered);
  };

  // Fetch odds data
  const fetchOddsData = async (isAutoRefresh = false): Promise<void> => {
    if (!isAutoRefresh) setLoading(true);
    if (isAutoRefresh) setRefreshing(true);
    setError('');
    
    try {
      console.log('Dashboard: Fetching odds data...');
      let data;
      
      // For real implementation, we would use the API based on filters
      // But for now, we'll just get all data and filter client-side
      data = await getAllOdds();
      
      if (Array.isArray(data)) {
        console.log(`Dashboard: Received ${data.length} events`);
        setEvents(data);
        setLastRefreshed(new Date());
      } else {
        console.error('Dashboard: Received invalid data format:', data);
        setError('Received invalid data format from server');
      }
    } catch (err) {
      console.error('Dashboard: Error fetching odds data:', err);
      setError('Failed to load odds data. Please try again later.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch available sports
  const fetchSportsData = async (): Promise<void> => {
    try {
      console.log('Dashboard: Fetching available sports...');
      const data = await getAvailableSports();
      
      if (Array.isArray(data)) {
        console.log(`Dashboard: Received ${data.length} sports`);
        setSports(data);
      } else {
        console.error('Dashboard: Received invalid sports data format:', data);
      }
    } catch (err) {
      console.error('Dashboard: Error fetching sports data:', err);
    }
  };

  // Handle sport filter change
  const handleSportChange = (sport: string): void => {
    console.log(`Dashboard: Sport changed to ${sport}`);
    setSelectedSport(sport);
  };

  // Handle view mode change
  const handleViewModeChange = (): void => {
    const newMode = viewMode === 'grid' ? 'table' : 'grid';
    console.log(`Dashboard: View mode changed to ${newMode}`);
    setViewMode(newMode);
  };

  // Handle logout
  const handleLogout = (): void => {
    console.log('Dashboard: Logging out');
    logout();
  };
  
  // Toggle favorite status of an event
  const toggleFavorite = (eventId: string): void => {
    const newFavorites = favorites.includes(eventId)
      ? favorites.filter(id => id !== eventId)
      : [...favorites, eventId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favoriteEvents', JSON.stringify(newFavorites));
  };
  
  // Format the last refreshed time
  const formatRefreshTime = (): string => {
    return lastRefreshed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const drawerWidth = 280;
  
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* AppBar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: '#1a237e',
          backgroundImage: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          
          <Box display="flex" alignItems="center">
            <SportsIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              BetInsights
            </Typography>
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
    
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Notifications">
              <IconButton 
                color="inherit"
                onClick={(e) => setNotificationAnchor(e.currentTarget)}
              >
                <Badge badgeContent={2} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Menu
              anchorEl={notificationAnchor}
              open={Boolean(notificationAnchor)}
              onClose={() => setNotificationAnchor(null)}
            >
              <MenuItem>
                <Typography variant="body2">New odds available for Premier League</Typography>
              </MenuItem>
              <MenuItem>
                <Typography variant="body2">Major change in NBA Finals odds</Typography>
              </MenuItem>
            </Menu>
            
            <Tooltip title="User Menu">
              <IconButton 
                color="inherit" 
                sx={{ ml: 1 }}
                onClick={(e) => setUserMenuAnchor(e.currentTarget)}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>U</Avatar>
              </IconButton>
            </Tooltip>
            
            <Menu
              anchorEl={userMenuAnchor}
              open={Boolean(userMenuAnchor)}
              onClose={() => setUserMenuAnchor(null)}
            >
              <MenuItem>
                <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                <Typography>Profile</Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                <Typography>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Sidebar / Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: 'none',
            backgroundColor: '#f5f7fa',
            backgroundImage: 'linear-gradient(to bottom, #f5f7fa, #ffffff)',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#3949ab' }}>
            Sports Odds Explorer
          </Typography>
          
          <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: 'rgba(255,255,255,0.8)' }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
              <FilterListIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
              Filter by Sport
            </Typography>
            <SportFilter 
              sports={sports} 
              selectedSport={selectedSport} 
              onSportChange={handleSportChange} 
            />
          </Paper>
          
          <Paper elevation={0} sx={{ p: 2, mb: 3, bgcolor: 'rgba(255,255,255,0.8)' }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
              <TuneIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
              View Options
            </Typography>
            <Button
              variant="outlined"
              startIcon={viewMode === 'grid' ? <ViewListIcon /> : <ViewModuleIcon />}
              onClick={handleViewModeChange}
              fullWidth
              sx={{ mt: 1 }}
            >
              {viewMode === 'grid' ? 'Table View' : 'Grid View'}
            </Button>
          </Paper>
          
          <Paper elevation={0} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.8)' }}>
            <Button 
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={() => fetchOddsData()}
              disabled={refreshing}
              fullWidth
              sx={{ 
                bgcolor: '#4caf50', 
                '&:hover': { bgcolor: '#388e3c' },
                position: 'relative'
              }}
            >
              {refreshing ? 'Refreshing...' : 'Refresh Data'}
              {refreshing && (
                <CircularProgress 
                  size={24} 
                  sx={{ 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Button>
            
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                Last updated: {formatRefreshTime()}
              </Typography>
            </Box>
          </Paper>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              Data provided by Sports Odds API
            </Typography>
            <Typography variant="caption" color="text.secondary">
              © EVARISTO NDOWERA 0711417281 -2025 FaidaRise
            </Typography>
          </Box>
        </Box>
      </Drawer>
      
      {/* Main content */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3, 
        width: { md: `calc(100% - ${drawerWidth}px)` },
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(drawerOpen && {
          width: { md: `calc(100% - ${drawerWidth}px)` },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
        bgcolor: '#f9fafc',
        overflowY: 'auto',
        height: '100%'
      }}>
        <Toolbar />
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Sports Odds Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
            Real-time odds data from multiple sports and bookmakers across Kenya
          </Typography>
          
          <Paper sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
            <Tabs 
              value={activeTab} 
              onChange={(_, newValue) => setActiveTab(newValue)}
              variant="fullWidth"
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="All Events" icon={<DashboardIcon />} iconPosition="start" />
              <Tab label="Today" icon={<SportsIcon />} iconPosition="start" />
              <Tab 
                label={`Favorites (${favorites.length})`} 
                icon={<FavoriteIcon />} 
                iconPosition="start" 
                disabled={favorites.length === 0}
              />
            </Tabs>
          </Paper>
        </Box>
        
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 3, borderRadius: 2 }}
            action={
              <Button color="inherit" size="small" onClick={() => fetchOddsData()}>
                Retry
              </Button>
            }
          >
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress size={60} thickness={4} />
              <Typography variant="h6" sx={{ mt: 2 }}>Loading Odds Data...</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Please wait while we fetch the latest odds
              </Typography>
            </Box>
          </Box>
        ) : (
          <>
            {filteredEvents.length > 0 ? (
              <>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1">
                    Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
                  </Typography>
                  
                  <Box>
                    <Tooltip title={viewMode === 'grid' ? "Switch to Table View" : "Switch to Grid View"}>
                      <IconButton onClick={handleViewModeChange} size="small" sx={{ mr: 1 }}>
                        {viewMode === 'grid' ? <ViewListIcon /> : <ViewModuleIcon />}
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Refresh Data">
                      <IconButton 
                        onClick={() => fetchOddsData()} 
                        size="small"
                        disabled={refreshing}
                      >
                        <RefreshIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              
                {viewMode === 'table' ? (
                  <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
                    <OddsTable 
                      events={filteredEvents} 
                      favorites={favorites}
                      onToggleFavorite={toggleFavorite}
                    />
                  </Paper>
                ) : (
                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: 'repeat(2, 1fr)',
                      lg: 'repeat(3, 1fr)',
                      xl: 'repeat(4, 1fr)'
                    },
                    gap: 3
                  }}>
                    {filteredEvents.map((event) => (
                      <OddsCard 
                        key={event.id} 
                        event={event} 
                        isFavorite={favorites.includes(event.id)}
                        onToggleFavorite={toggleFavorite}
                      />
                    ))}
                  </Box>
                )}
              </>
            ) : (
              <Paper sx={{ 
                p: 6, 
                textAlign: 'center', 
                borderRadius: 2,
                bgcolor: 'rgba(255,255,255,0.8)'
              }}>
                <Box sx={{ mb: 3 }}>
                  <SportsIcon sx={{ fontSize: 60, color: 'text.disabled' }} />
                </Box>
                <Typography variant="h5" gutterBottom>No events found</Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {activeTab === 2 
                    ? "You haven't added any events to your favorites yet."
                    : "Try selecting a different sport or check back later for updated odds."
                  }
                </Typography>
                {activeTab === 2 && (
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={() => setActiveTab(0)}
                  >
                    Browse All Events
                  </Button>
                )}
              </Paper>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;