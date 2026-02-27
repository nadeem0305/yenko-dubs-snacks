import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define which routes are public
const isPublicRoute = createRouteMatcher([
  '/',
  '/shop(.*)',
  '/about',
  '/sign-in(.*)',
  '/sign-up(.*)',
])

export default clerkMiddleware(async (auth, request) => {
  // If the route is NOT public, protect it
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
