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

-- 1.5 Add new columns if the table already existed
DO $$
BEGIN
    BEGIN
        ALTER TABLE shipments ADD COLUMN latitude DECIMAL;
    EXCEPTION
        WHEN duplicate_column THEN null;
    END;
    BEGIN
        ALTER TABLE shipments ADD COLUMN longitude DECIMAL;
    EXCEPTION
        WHEN duplicate_column THEN null;
    END;
END $$;

-- 2. Enable Row Level Security
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;

-- 3. Create a policy to allow anyone to READ shipments (for tracking)
DROP POLICY IF EXISTS "Allow public read access" ON shipments;
CREATE POLICY "Allow public read access" ON shipments
    FOR SELECT
    TO anon
    USING (true);

-- 4. Create a policy to allow anonymous INSERTS (for this demo/app)
DROP POLICY IF EXISTS "Allow public insert access" ON shipments;
CREATE POLICY "Allow public insert access" ON shipments
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- 5. Create a policy to allow anyone to UPDATE shipments (for the dashboard)
DROP POLICY IF EXISTS "Allow public update access" ON shipments;
CREATE POLICY "Allow public update access" ON shipments
    FOR UPDATE
    TO anon
    USING (true)
    WITH CHECK (true);
