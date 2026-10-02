import{NextResponse}from'next/server';export async function POST(r:Request){const x=NextResponse.redirect(new URL('/login',r.url),303);x.cookies.delete('session');return x}
