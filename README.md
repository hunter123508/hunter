EasyFarmingUS (Vercel/Next.js Starter)

## Features
- Search farm/ATV/side-by-side parts (1903–present)
- View details, images, buy links
- PostgreSQL backend (Vercel DB or external)

## Setup

1. Clone the repo
2. Create a PostgreSQL database (Vercel Postgres or external)
3. Apply the schema below
4. Set `POSTGRES_URL` in Vercel environment variables

## Local Dev
```bash
npm install
npm run dev
```

## Deploy on Vercel
- Import the repo
- Set your database connection string as `POSTGRES_URL` in Vercel’s dashboard

## Database Schema
```sql
CREATE TABLE equipment (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL
);

CREATE TABLE part (
    id SERIAL PRIMARY KEY,
    equipment_id INT REFERENCES equipment(id),
    name VARCHAR(100) NOT NULL,
    image_url VARCHAR(255),
    affiliate_link VARCHAR(255),
    available BOOLEAN DEFAULT TRUE,
    description TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    part_id INT REFERENCES part(id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending'
);
```
