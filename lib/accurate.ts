import { db } from './db';
export async function syncItems(){
 const token=process.env.ACCURATE_ACCESS_TOKEN, host=process.env.ACCURATE_HOST, session=process.env.ACCURATE_SESSION_ID;
 if(!token||!host||!session) throw new Error('Accurate belum dikonfigurasi. Isi ACCURATE_ACCESS_TOKEN, ACCURATE_HOST, ACCURATE_SESSION_ID.');
 const url=new URL('/accurate/api/item/list.do',host); url.searchParams.set('fields','id,name,no,unit1.name'); url.searchParams.set('filter.itemType','INVENTORY'); url.searchParams.set('sp.pageSize','100');
 const r=await fetch(url,{headers:{Authorization:`Bearer ${token}`,'X-Session-ID':session},redirect:'follow',cache:'no-store'}); const j=await r.json(); if(!r.ok||!j.s) throw new Error(j.d?.join?.(', ')||'Gagal mengambil item Accurate');
 for(const x of j.d||[]) await db.accurateItem.upsert({where:{accurateId:String(x.id)},update:{code:x.no,name:x.name,unit:x.unit1?.name||'PCS',syncedAt:new Date()},create:{accurateId:String(x.id),code:x.no,name:x.name,unit:x.unit1?.name||'PCS'}}); return j.d?.length||0;
}
export async function pushPR(pr:any){
 // Endpoint transaksi sengaja configurable: nama endpoint/field harus dicocokkan dengan API docs + scope akun Accurate Anda.
 const endpoint=process.env.ACCURATE_PR_SAVE_PATH; if(!endpoint) throw new Error('Set ACCURATE_PR_SAVE_PATH sesuai endpoint transaksi tujuan di dokumentasi Accurate akun Anda.');
 const host=process.env.ACCURATE_HOST!, token=process.env.ACCURATE_ACCESS_TOKEN!, session=process.env.ACCURATE_SESSION_ID!;
 const body=new URLSearchParams(); body.set('transDate',new Date().toLocaleDateString('en-GB')); body.set('description',pr.purpose);
 pr.items.forEach((it:any,i:number)=>{ body.set(`detailItem[${i}].itemNo`,it.itemCode); body.set(`detailItem[${i}].quantity`,String(it.qty)); });
 const r=await fetch(new URL(endpoint,host),{method:'POST',headers:{Authorization:`Bearer ${token}`,'X-Session-ID':session,'Content-Type':'application/x-www-form-urlencoded'},body,redirect:'follow'}); const j=await r.json(); if(!r.ok||!j.s) throw new Error(j.d?.join?.(', ')||'Sync Accurate gagal'); return j;
}
