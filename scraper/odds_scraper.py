#!/usr/bin/env python3
"""
FaidaRise Internship Technical Interview - Task 1
Sports Odds API Client

This script fetches sports odds data from The Odds API and saves the data to a JSON file.
"""

import requests
import json
import time
import logging
from datetime import datetime
import os

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("odds_scraper.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Constants
API_KEY = "d1f42b7d27541e611b9f1fd57ed75926"
BASE_URL = "https://api.the-odds-api.com/v4"
REGION = "uk"  # Using UK region as it works with the API
MARKETS = "h2h"  # Stick to h2h markets
ODDS_FORMAT = "decimal"
MAX_RETRIES = 3
RETRY_DELAY = 2  # Base delay in seconds
OUTPUT_FILE = "sports_odds.json"

# Sports to fetch (using supported sports by the API)
SPORTS = [
    "soccer_epl",           # English Premier League
    "soccer_spain_la_liga", # Spanish La Liga
    "basketball_nba",       # NBA Basketball
    "americanfootball_nfl", # NFL Football
    "baseball_mlb"          # MLB Baseball
]


def fetch_available_sports():
    """Fetch all available sports from the API."""
    url = f"{BASE_URL}/sports"
    params = {
        "apiKey": API_KEY
    }
    
    try:
        logger.info("Fetching available sports...")
        response = requests.get(url, params=params, timeout=30)
        response.raise_for_status()
        
        sports_data = response.json()
        logger.info(f"Found {len(sports_data)} available sports")
        
        # Check remaining API usage
        remaining_requests = response.headers.get('x-requests-remaining', 'Unknown')
        logger.info(f"API requests remaining: {remaining_requests}")
        
        return sports_data
    except requests.exceptions.RequestException as e:
        logger.error(f"Error fetching available sports: {e}")
        return []


def fetch_odds_with_retry(sport):
    """Fetch odds data for a specific sport with retry mechanism."""
    url = f"{BASE_URL}/sports/{sport}/odds"
    params = {
        "apiKey": API_KEY,
        "regions": REGION,
        "markets": MARKETS,
        "oddsFormat": ODDS_FORMAT
    }
    
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            logger.info(f"Fetching odds for {sport} - Attempt {attempt}")
            response = requests.get(url, params=params, timeout=30)
            
            # Check if we hit rate limits
            if response.status_code == 429:
                retry_after = int(response.headers.get('Retry-After', 60))
                logger.warning(f"Rate limit hit, waiting for {retry_after} seconds")
                time.sleep(retry_after)
                continue
                
            response.raise_for_status()
            
            # Check remaining API usage
            remaining_requests = response.headers.get('x-requests-remaining', 'Unknown')
            logger.info(f"API requests remaining: {remaining_requests}")
            
            return response.json()
        
        except requests.exceptions.RequestException as e:
            logger.error(f"Error on attempt {attempt}: {e}")
            if attempt < MAX_RETRIES:
                # Exponential backoff
                sleep_time = RETRY_DELAY * (2 ** (attempt - 1))
                logger.info(f"Retrying in {sleep_time} seconds...")
                time.sleep(sleep_time)
            else:
                logger.error(f"Failed to fetch odds for {sport} after {MAX_RETRIES} attempts")
                return []


def process_odds_data(all_odds_data):
    """Process and structure the odds data from multiple sports."""
    processed_data = []
    
    for sport_data in all_odds_data:
        if not sport_data:
            continue
            
        # Only take first 5 events per sport to keep the data manageable
        for event in sport_data[:5]:
            try:
                sport_key = event.get('sport_key', '')
                sport_title = event.get('sport_title', '')
                home_team = event.get('home_team', '')
                away_team = event.get('away_team', '')
                commence_time = event.get('commence_time', '')
                
                # Format commence time to more readable format
                if commence_time:
                    try:
                        dt = datetime.fromisoformat(commence_time.replace('Z', '+00:00'))
                        formatted_time = dt.strftime('%Y-%m-%d %H:%M:%S')
                    except:
                        formatted_time = commence_time
                else:
                    formatted_time = "TBD"
                
                # Extract odds data
                odds = {'h2h': {'home': None, 'away': None, 'draw': None}}
                bookmakers = event.get('bookmakers', [])
                
                if bookmakers:
                    # Get odds from the first available bookmaker
                    bookmaker = bookmakers[0]
                    bookmaker_name = bookmaker.get('title', '')
                    markets = bookmaker.get('markets', [])
                    
                    for market in markets:
                        market_key = market.get('key', '')
                        outcomes = market.get('outcomes', [])
                        
                        if market_key == 'h2h':
                            for outcome in outcomes:
                                team = outcome.get('name', '')
                                price = outcome.get('price', 0)
                                
                                if team == home_team:
                                    odds['h2h']['home'] = price
                                elif team == away_team:
                                    odds['h2h']['away'] = price
                                else:
                                    odds['h2h']['draw'] = price
                
                # Create event object
                event_obj = {
                    'id': event.get('id', ''),
                    'sport_key': sport_key,
                    'sport_title': sport_title,
                    'home_team': home_team,
                    'away_team': away_team,
                    'commence_time': formatted_time,
                    'bookmaker': bookmaker_name if bookmakers else '',
                    'odds': odds
                }
                
                processed_data.append(event_obj)
                
            except Exception as e:
                logger.error(f"Error processing event data: {e}")
                continue
    
    return processed_data


def save_to_json(data, filename=OUTPUT_FILE):
    """Save data to JSON file with error handling."""
    try:
        # Create directory if it doesn't exist
        dir_path = os.path.dirname(os.path.abspath(filename))
        if dir_path:
            os.makedirs(dir_path, exist_ok=True)
        
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        file_size = os.path.getsize(filename) / 1024  # Size in KB
        logger.info(f"Successfully saved {len(data)} events to {filename} ({file_size:.2f} KB)")
        return True
    except Exception as e:
        logger.error(f"Error saving to JSON: {e}")
        return False


def main():
    """Main function to run the odds scraper."""
    logger.info("Starting sports odds scraper...")
    
    try:
        # Fetch odds for our target sports
        all_odds_data = []
        for sport in SPORTS:
            odds_data = fetch_odds_with_retry(sport)
            if odds_data:
                all_odds_data.append(odds_data)
                logger.info(f"Successfully fetched {len(odds_data)} events for {sport}")
            else:
                logger.warning(f"No data fetched for {sport}")
        
        # Process and structure the data
        processed_data = process_odds_data(all_odds_data)
        
        # Save to JSON file
        if processed_data:
            save_to_json(processed_data)
            logger.info(f"Successfully scraped and saved {len(processed_data)} sporting events")
        else:
            logger.error("No data to save.")
            return False
        
        return True
        
    except Exception as err:
        logger.error(f"Scraper failed: {err}")
        return False


if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)  # Return proper exit code for scripts