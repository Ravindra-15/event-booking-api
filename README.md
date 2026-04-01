# Event Booking API

Mini Event Management System built using Node.js, Express, MySQL.

## Live API
https://event-booking-api-ls90.onrender.com

## Swagger Docs
https://event-booking-api-ls90.onrender.com/api-docs

## Features
- Create Events
- Book Tickets
- Attendance Tracking
- User Bookings
- MySQL Transactions
- Swagger Documentation

## Tech Stack
- Node.js
- Express.js
- MySQL
- Railway (Database)
- Render (Deployment)

## Setup Locally

1. Clone repo
git clone <repo-url>

2. Install dependencies
npm install

3. Create .env
DATABASE_URL=your_mysql_url
PORT=5000

4. Run server
npm start

## API Endpoints

GET /api/events  
POST /api/events  
POST /api/bookings  
GET /api/users/:id/bookings  
POST /api/events/:id/attendance  

## Deployment
- Database: Railway
- Server: Render