import { createClient } from "@supabase/supabase-js";
const URL = "https://mpqdjcwlacgndkqiogjk.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wcWRqY3dsYWNnbmRrcWlvZ2prIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIxNjY0MTQsImV4cCI6MTk5Nzc0MjQxNH0.-Hh7sR2cE8qKI2eXrO4lYKOCskcq4gAj9XHdqyfxSHo";
export const supabase = createClient(URL, API_KEY);
