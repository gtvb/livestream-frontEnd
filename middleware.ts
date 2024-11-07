import NextAuth from 'next-auth';
import { NextResponse, type NextRequest } from 'next/server'
import { authConfig } from './auth.config';
import { auth } from './auth';
import { redirect } from 'next/navigation';
import { liveStreamsArraySchema } from './app/lib/zod';
 
export default NextAuth(authConfig).auth;

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/live/manage')) {
    const session = await auth()

    if (!session) {
      return NextResponse.redirect(new URL("/login", request.nextUrl))
    }

    const liveStreamId = request.nextUrl.pathname.slice(13)
    const response = await fetch(`http://localhost:3333/livestreams/${session.user?.id}`)
    const data = await response.json()

    if (data["livestreams"] == null) {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl))
    }

    const livestreams = await liveStreamsArraySchema.parseAsync(data["livestreams"])
    const hasId = livestreams.some((ls) => ls.id === liveStreamId)

    if (!hasId) {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl))
    }
  }

  return NextResponse.next()
}
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};