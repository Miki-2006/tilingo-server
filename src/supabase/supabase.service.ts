// supabase.service.ts
import { Module } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
)

@Module({
    providers: [
        {
            provide: 'SUPABASE_CLIENT',
            useValue: supabase,
        },
    ],
    exports: ['SUPABASE_CLIENT'],
})
export class SupabaseModule {};