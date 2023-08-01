
# Bookmyshow Ticketing Platform API

This project provides an API for the Bookmyshow ticketing platform. It allows users to select a theatre in the city, view the dates of the next 7 days, retrieve movie details for a specific theatre and date, and book seats for a specific showtime.

## Requirements

- Node.js (v12 or above)
- npm (v6 or above)
- MySQL

## Installation

1. Clone the repository:
   ```shell
   git clone https://github.com/funnelferry/theatre-api.git
   cd theatre-api
   ```
2. Install Dependencies:

   ```shell
   npm install
   ```
3. Configure Database in `src/config/db.js` through `src/.env`.

4. Start the server:

   ```shell
   npm start
   ```
5. The server should now be running at `http://localhost:3000`.

## API Endpoints

### 1. Get all theatre

- Endpoint: `/theatres`
- Method: GET
- Description: Returns a list of all theatre in the city.

### 2. Get movies and showtimes for a theatre (next 7 days)

- Endpoint: `/theatres/:id/movies`
- Method: GET
- Description: Returns the movies and showtimes for a specific theatre for the next 7 days.

### 3. Fetch showtimes for a theatre for the next 7 days

- Endpoint: `/theatres/:theatreId/showtimes/next-7-days`
- Method: GET
- Description: Returns the showtimes for a specific theatre for the next 7 days.

### 4. Fetch showtimes for a theatre for a specific date

- Endpoint: `/theatres/:theatreId/showtimes/:date`
- Method: GET
- Description: Returns the showtimes for a specific theatre on a given date.

### 5. Book a seat for a specific showtime

- Endpoint: `/showtimes/:showtimeId/bookseat`
- Method: POST
- Description: Books a seat for a specific showtime.

Please replace `:id`, `:theatreId`, `:date`, and `:showtimeId` with appropriate values in the above endpoints. The date should be provided in the format 'YYYY-MM-DD'.
