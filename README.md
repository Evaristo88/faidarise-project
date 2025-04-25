Here's a well-structured **README.md** file for your **Sports Odds Dashboard** project:

```markdown
# Sports Odds Dashboard

A full-stack web application for collecting, displaying, and analyzing sports betting odds data from various bookmakers.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Setup Instructions](#setup-instructions)
- [Technology Choices and Rationale](#technology-choices-and-rationale)
- [Challenges Faced and Solutions](#challenges-faced-and-solutions)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Overview

This project was developed as part of the FaidaRise Internship Technical Interview. It consists of three main components:

1. **Web Scraper** - A Python script to collect sports odds data from bookmakers.
2. **Backend API** - An Express.js server with JWT authentication.
3. **Frontend Dashboard** - A responsive React-based UI built with Astro.

---

## Features

- **Data Collection**: Scheduled scraping of sports odds from multiple bookmakers.
- **Secure API**: JWT-based authentication to protect odds data.
- **Filtering & Sorting**: Filter odds by sport type and sort by various criteria.
- **Responsive Design**: Mobile-friendly dashboard that adapts to different screen sizes.
- **Real-time Updates**: Visual indicators for live and upcoming events.
- **Favorites System**: Allow users to mark and track favorite events.

---

## Technology Stack

- **Scraper**: Python with Requests library
- **Backend**: Node.js, Express, TypeScript
- **Frontend**: Astro, React, Tailwind CSS, Material UI
- **Authentication**: JWT (JSON Web Tokens)
- **Data Storage**: JSON file-based storage

---

## Setup Instructions

### Prerequisites

- Node.js (v18.14.1 or higher)
- Python 3.8+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   JWT_SECRET=faidariseInternshipSecretKey2025
   NODE_ENV=development
   ```
4. Build the TypeScript code:
   ```bash
   npm run build
   ```
5. Start the server:
   ```bash
   npm start
   ```

### Scraper Setup

1. Navigate to the scraper directory:
   ```bash
   cd scraper
   ```
2. Install required packages:
   ```bash
   pip install requests
   ```
3. Run the scraper:
   ```bash
   python odds_scraper.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the dashboard at [http://localhost:4000](http://localhost:4000)

### Login Credentials

- Username: `admin`
- Password: `admin123`

---

## Technology Choices and Rationale

### Python for Scraping
Python was chosen for the web scraper due to its rich ecosystem of libraries for data collection and processing. The `requests` library provides a simple, intuitive interface for HTTP requests, while Python's exception handling capabilities allow for robust error management.

### TypeScript for Backend
TypeScript was selected for the backend to provide strong typing and better code organization. This improves code reliability and makes the project more maintainable, especially as it scales. Express.js provides a lightweight framework with middleware architecture that perfectly suits the API requirements.

### Astro for Frontend
Astro was chosen as the frontend framework for its hybrid approach that combines static site generation with dynamic components. This offers excellent performance while still allowing for interactive UI elements through React components. Key benefits include:
- **Performance**: Fast page loads with minimal JavaScript
- **Component Islands**: Selective hydration for interactive components
- **Framework-agnostic**: Ability to use React alongside other frameworks if needed

### Material UI & Tailwind CSS
Material UI provides high-quality, customizable React components that follow Google's design guidelines, ensuring a polished user experience. Tailwind CSS offers utility-first styling that speeds up development and ensures consistency across the application.

---

## Challenges Faced and Solutions

### Web Scraping Challenges

- **Anti-Scraping Measures**:
  - **Challenge**: Popular betting sites implement sophisticated anti-scraping techniques, including IP blocking, CAPTCHA systems, and complex JavaScript rendering.
  - **Solution**: Implemented exponential backoff retry logic and user-agent rotation. For sites with more aggressive protections, switched to using a public API (The Odds API) that aggregates data from multiple bookmakers.

- **Inconsistent Data Structures**:
  - **Challenge**: Different bookmakers present odds in varied formats and structures.
  - **Solution**: Developed a normalized data model and transformation functions to standardize data from different sources into a consistent format.

- **Rate Limiting**:
  - **Challenge**: API rate limits restricted the volume and frequency of data collection.
  - **Solution**: Implemented request throttling and scheduling to spread requests over time and stay within rate limits.

### Backend Challenges

- **Path Resolution Across Environments**:
  - **Challenge**: File path differences between development and production environments caused issues with locating the odds data file.
  - **Solution**: Implemented a robust path resolution system using Node.js path utilities to ensure correct file access across different environments.

- **Authentication Security**:
  - **Challenge**: Implementing secure authentication without a database.
  - **Solution**: Used JWT with appropriate expiration policies and secure environment variables for secrets.

### Frontend Challenges

- **Responsive Design for Data Tables**:
  - **Challenge**: Displaying complex odds data on mobile devices while maintaining usability.
  - **Solution**: Created two view modes (card and table) with responsive breakpoints to optimize the display for different screen sizes.

- **Real-time Data Updates**:
  - **Challenge**: Keeping odds data current without overwhelming the backend with requests.
  - **Solution**: Implemented intelligent polling with visual indicators for data freshness and a manual refresh option.

---

## Future Improvements

1. **Data Collection Enhancements**:
   - Implement more sophisticated web scraping techniques using headless browsers like Playwright or Puppeteer.
   - Add support for WebSocket connections to receive real-time odds updates.
   - Expand coverage to include more sports and betting markets.

2. **Backend Enhancements**:
   - Migrate from file-based storage to a proper database (MongoDB or PostgreSQL).
   - Implement a caching layer for improved performance.
   - Add user management with customizable profiles and permissions.
   - Implement webhooks for event-driven architecture.

3. **Frontend Enhancements**:
   - Add data visualization components (charts, graphs) for odds movement over time.
   - Implement comparison features to identify value bets across bookmakers.
   - Add a notification system for significant odds changes.
   - Develop a mobile app using React Native for a native mobile experience.

4. **Analytics Capabilities**:
   - Implement statistical models to analyze odds movement patterns.
   - Add historical data tracking to identify trends.
   - Develop predictive features based on past outcomes and current odds.

5. **Deployment and Infrastructure**:
   - Set up CI/CD pipeline for automated testing and deployment.
   - Implement containerization with Docker for consistent environments.
   - Add comprehensive monitoring and alerting.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.
```

This README file covers everything from setup instructions to the rationale behind technology choices, challenges faced, and future improvements. You can adjust and refine the content as needed.
