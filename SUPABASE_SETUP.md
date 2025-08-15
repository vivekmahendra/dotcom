# Supabase Setup Instructions

## 🚀 Quick Setup Guide

### 1. Get Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings > API**
4. Copy these values:
   - **Project URL** (looks like: `https://your-project-ref.supabase.co`)
   - **service_role key** (the long key under "service_role")

### 2. Create Environment File

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and replace the placeholders:
   ```env
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key-here
   ```

### 3. Create Database Table

1. Go to **SQL Editor** in your Supabase dashboard
2. Run this SQL to create the newsletter table:

```sql
-- Create newsletter_subscribers table
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_subscribers_status ON newsletter_subscribers(status);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_newsletter_subscribers_updated_at 
    BEFORE UPDATE ON newsletter_subscribers 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 4. Set Up Row Level Security (Optional but Recommended)

```sql
-- Enable RLS on the table
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow service role to do everything (for server-side operations)
CREATE POLICY "Service role can manage all subscribers" ON newsletter_subscribers
  FOR ALL USING (auth.role() = 'service_role');
```

### 5. Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Try subscribing with an email on your about page or ideas page
3. Check your Supabase dashboard **Table Editor** to see if the email was saved

## 🔧 Troubleshooting

### If you see environment variable errors:
- Make sure `.env.local` exists and has the correct values
- Restart your development server after creating the file
- Check that your keys don't have extra spaces or quotes

### If the newsletter form doesn't work:
- The system will fall back to in-memory storage if Supabase isn't configured
- Check the browser console for any error messages
- Verify your Supabase credentials are correct

### If you want to view subscribers:
- Go to your Supabase dashboard
- Navigate to **Table Editor**
- Select the `newsletter_subscribers` table

## 🎉 You're Done!

Once you complete these steps, your newsletter will be powered by Supabase and all subscriptions will be permanently stored in your database!