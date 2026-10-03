import{NextResponse}from'next/server';export async function POST(r:Request){const x=new NextResponse(null,{status:303,headers:{Location:'/login'}});x.cookies.delete('session');return x}
