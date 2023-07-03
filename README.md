# Bookmyshow Ticketing Platform API

This project provides an API for the Bookmyshow ticketing platform. It allows users to select a theater in the city, view the dates of the next 7 days, and retrieve movie details for a specific theater and date.

## Requirements

- Node.js (v12 or above)
- npm (v6 or above)
- MySQL

## Installation

1. Clone the repository:
   ```shell
   git clone https://github.com/funnelferry/theatre-api.git
   cd theatre-api
2. Install Dependencies:

   ```shell
   npm install
3. Configure Database in `src/config/db.js` through `src/.env`:

4. Start the server:

   ```shell
   npm start
2. The server should now be running at `http://localhost:3000`.

## API Endpoints

### 1. Get all theaters

- Endpoint: `/theatres`
- Method: GET
- Description: Returns a list of all theaters in the city.

### 2. Get movies for a specific theater and date

- Endpoint: `/theatres/:id/movies/:date`
- Method: GET
- Description: Returns the list of movies playing at a specific theater on the given date. The date should be provided in the format 'YYYY-MM-DD'.

### 3. Get available dates for a specific theater

- Endpoint: `/theatres/:id/movies`
- Method: GET
- Description: Returns the dates of the next 7 days when movies are available at the specified theater.
