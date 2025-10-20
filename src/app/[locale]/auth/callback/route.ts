import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const locale = requestUrl.searchParams.get('locale') || 'ru';

  if (code) {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient(cookieStore);
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect to home page after successful auth
  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}
