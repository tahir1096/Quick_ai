-- Quick AI Database Schema
-- Run this in your Neon database to create the necessary tables

CREATE TABLE IF NOT EXISTS creations (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    prompt TEXT NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_creations_user_id ON creations(user_id);

-- Create an index on type for filtering by creation type
CREATE INDEX IF NOT EXISTS idx_creations_type ON creations(type);

-- Create an index on created_at for sorting by date
CREATE INDEX IF NOT EXISTS idx_creations_created_at ON creations(created_at);
