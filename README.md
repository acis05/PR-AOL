# PR Accurate App
Web Purchase Request dengan isolasi data requester, approval, procurement integration gate, PostgreSQL, dan adapter Accurate Online.

## Fitur MVP
- Login + role REQUESTER / APPROVER / PROCUREMENT / ADMIN
- Requester hanya dapat membuka PR miliknya (kecuali approver yang ditugaskan / procurement / admin)
- Create PR dari cache item Accurate
- Approval / rejection
- Integration Gate dan retry status
- Audit log
- Sinkronisasi master item dari Accurate
- Siap deploy Railway

## Local
1. `cp .env.example .env` lalu isi `DATABASE_URL` dan `AUTH_SECRET`.
2. `npm install`
3. `npx prisma db push`
4. `npx tsx prisma/seed.ts` (atau jalankan seed via perintah Node/tsx yang tersedia)
5. `npm run dev`

Semua akun demo memakai password `Admin123!`.

## Railway
1. Push repository ini ke GitHub.
2. Railway > New Project > Deploy from GitHub Repo.
3. Tambahkan PostgreSQL service.
4. Pastikan `DATABASE_URL` tersedia pada app service; tambahkan `AUTH_SECRET`.
5. Deploy. Build command di `railway.json` menjalankan Prisma `db push` dan Next build.
6. Untuk data demo, jalankan sekali dari Railway shell: `npx tsx prisma/seed.ts`.

## Accurate Online
Set variables `ACCURATE_ACCESS_TOKEN`, `ACCURATE_HOST`, `ACCURATE_SESSION_ID`. Tombol Settings > Sync Items memanggil `/accurate/api/item/list.do`.

Push PR sengaja memakai `ACCURATE_PR_SAVE_PATH` yang configurable. Accurate menyediakan banyak API dan scope; endpoint transaksi serta field final harus dicocokkan dengan **Daftar API pada Developer Area akun Anda** sebelum produksi. Jangan menebak endpoint transaksi.

## Production checklist
- Ganti semua password demo / jangan seed demo di production permanen.
- Gunakan AUTH_SECRET acak >= 32 byte.
- Tambahkan CSRF/rate limiting/SSO bila digunakan secara luas.
- Tambahkan attachment object storage jika diperlukan.
- Ubah create PR UI menjadi multi-item (schema sudah mendukung).
- Implementasikan approval rules sesuai departemen/nominal perusahaan.
