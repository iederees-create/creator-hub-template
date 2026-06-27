-- Creator Hub Pro Database Schema
-- Run this in your Supabase SQL Editor to prepare the database for the Creator Hub template

-- 1. Create Brand Bookings Table
CREATE TABLE IF NOT EXISTS public.creator_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    brand_name TEXT NOT NULL,
    email TEXT NOT NULL,
    budget_range TEXT,
    campaign_details TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Media Portfolio Table (For dynamic gallery population)
CREATE TABLE IF NOT EXISTS public.creator_portfolio (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category TEXT NOT NULL CHECK (category IN ('editorial', 'beauty', 'travel', 'campaign')),
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Setup Row Level Security (RLS)
ALTER TABLE public.creator_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_portfolio ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert a booking (public submission)
CREATE POLICY "Allow public inserts for bookings" ON public.creator_bookings
    FOR INSERT WITH CHECK (true);

-- Allow public to read portfolio items
CREATE POLICY "Allow public read for portfolio" ON public.creator_portfolio
    FOR SELECT USING (true);

-- Only authenticated admins can read/update bookings or modify portfolio
-- (Assuming standard auth.uid() checks or similar logic based on your setup)
CREATE POLICY "Allow authenticated users to manage bookings" ON public.creator_bookings
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage portfolio" ON public.creator_portfolio
    FOR ALL USING (auth.role() = 'authenticated');
