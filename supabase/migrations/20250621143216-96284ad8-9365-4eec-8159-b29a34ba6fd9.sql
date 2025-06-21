
-- Create a table for storing user data
CREATE TABLE public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  age INTEGER,
  nin TEXT,
  driving_license TEXT,
  residence_address TEXT,
  photo TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) for security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now (you can restrict this later)
CREATE POLICY "Allow all operations on user_profiles" 
  ON public.user_profiles 
  FOR ALL 
  TO public 
  USING (true) 
  WITH CHECK (true);
