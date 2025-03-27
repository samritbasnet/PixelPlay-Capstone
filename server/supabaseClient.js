import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rblazcoulmgvrsqjbgcg.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJibGF6Y291bG1ndnJzcWpiZ2NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMjMyNzMsImV4cCI6MjA1ODU5OTI3M30.9ovDfAc3yjqGvFrShwxd91j_qcHtZYfSpiz5TshBMvc';
export const supabase = createClient(supabaseUrl, supabaseKey);
