-- 1. Create the shipments table if it doesn't exist
CREATE TABLE IF NOT EXISTS shipments (
    tracking_number TEXT PRIMARY KEY,
    sender_name TEXT,
    sender_email TEXT,
    recipient_name TEXT,
    recipient_email TEXT,
    recipient_address TEXT,
    recipient_phone TEXT,
    item_type TEXT,
    description TEXT,
    weight DECIMAL,
    dimensions TEXT,
    origin TEXT,
    destination TEXT,
    current_status TEXT DEFAULT 'Pending',
    payment_method TEXT DEFAULT 'Bank Transfer',
    payment_status TEXT DEFAULT 'Pending',
    is_deleted BOOLEAN DEFAULT FALSE,
    latitude DECIMAL,
    longitude DECIMAL,
    estimated_delivery TIMESTAMPTZ,
    updates JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create the chat_rooms table
CREATE TABLE IF NOT EXISTS chat_rooms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name TEXT,
    customer_email TEXT,
    user_id TEXT,
    last_message TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create the chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
    sender_role TEXT,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3b. Create the email_threads table for direct email conversations
CREATE TABLE IF NOT EXISTS email_threads (
    id UUID PRIMARY KEY,
    recipient_name TEXT,
    recipient_email TEXT NOT NULL,
    sender_name TEXT,
    sender_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    reply_to TEXT NOT NULL,
    last_message TEXT,
    status TEXT DEFAULT 'open',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3c. Create the email_messages table
CREATE TABLE IF NOT EXISTS email_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    thread_id UUID REFERENCES email_threads(id) ON DELETE CASCADE,
    direction TEXT NOT NULL,
    sender_name TEXT,
    sender_email TEXT,
    recipient_name TEXT,
    recipient_email TEXT,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_messages ENABLE ROW LEVEL SECURITY;

-- 5. Policies for shipments
DROP POLICY IF EXISTS "Allow public read access" ON shipments;
CREATE POLICY "Allow public read access" ON shipments FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow public insert access" ON shipments;
CREATE POLICY "Allow public insert access" ON shipments FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access" ON shipments;
CREATE POLICY "Allow public update access" ON shipments FOR UPDATE TO public USING (true) WITH CHECK (true);

-- 6. Policies for chat_rooms
DROP POLICY IF EXISTS "Allow public read access" ON chat_rooms;
CREATE POLICY "Allow public read access" ON chat_rooms FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow public insert access" ON chat_rooms;
CREATE POLICY "Allow public insert access" ON chat_rooms FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access" ON chat_rooms;
CREATE POLICY "Allow public update access" ON chat_rooms FOR UPDATE TO public USING (true) WITH CHECK (true);

-- 7. Policies for chat_messages
DROP POLICY IF EXISTS "Allow public read access" ON chat_messages;
CREATE POLICY "Allow public read access" ON chat_messages FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow public insert access" ON chat_messages;
CREATE POLICY "Allow public insert access" ON chat_messages FOR INSERT TO public WITH CHECK (true);

-- 8. Policies for email_threads
DROP POLICY IF EXISTS "Allow public read access" ON email_threads;
CREATE POLICY "Allow public read access" ON email_threads FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow public insert access" ON email_threads;
CREATE POLICY "Allow public insert access" ON email_threads FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access" ON email_threads;
CREATE POLICY "Allow public update access" ON email_threads FOR UPDATE TO public USING (true) WITH CHECK (true);

-- 9. Policies for email_messages
DROP POLICY IF EXISTS "Allow public read access" ON email_messages;
CREATE POLICY "Allow public read access" ON email_messages FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "Allow public insert access" ON email_messages;
CREATE POLICY "Allow public insert access" ON email_messages FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update access" ON email_messages;
CREATE POLICY "Allow public update access" ON email_messages FOR UPDATE TO public USING (true) WITH CHECK (true);

-- 10. Enable real-time for chat_messages and email tables
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime;
COMMIT;
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE email_threads;
ALTER PUBLICATION supabase_realtime ADD TABLE email_messages;
