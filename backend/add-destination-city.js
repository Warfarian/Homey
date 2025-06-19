import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addDestinationCityColumn() {
  try {
    console.log('Adding destination_city column to profiles table...');
    
    // Try to add the column using a direct query
    const { data, error } = await supabase
      .from('profiles')
      .select('destination_city')
      .limit(1);
    
    if (error && error.code === 'PGRST116') {
      console.log('Column does not exist, need to add it manually via Supabase dashboard');
      console.log('Please run this SQL in your Supabase SQL editor:');
      console.log('ALTER TABLE public.profiles ADD COLUMN destination_city TEXT;');
    } else if (error) {
      console.error('Error checking column:', error);
    } else {
      console.log('destination_city column already exists');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

addDestinationCityColumn();
