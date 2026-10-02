import { cookies } from 'next/headers'; import { SignJWT, jwtVerify } from 'jose'; import { db } from './db';
const secret = new TextEncoder().encode(process.env.AUTH_SECRET || 'dev-secret-change-me');
export async function makeSession(userId:string){ return new SignJWT({userId}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('7d').sign(secret); }
export async function currentUser(){ try { const c=await cookies(); const token=c.get('session')?.value; if(!token)return null; const {payload}=await jwtVerify(token,secret); return db.user.findUnique({where:{id:String(payload.userId)}}); } catch{return null;} }
export function canSeeAll(role:string){ return ['ADMIN','PROCUREMENT'].includes(role); }
