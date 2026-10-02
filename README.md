# PR Accurate App V5

Web app MVP Purchase Request + approval + Accurate Online integration gate.

## Railway deployment

1. Upload seluruh isi folder ini ke root repository GitHub.
2. Buat project Railway dari repository tersebut.
3. Tambahkan service PostgreSQL di project Railway yang sama.
4. Pastikan aplikasi memiliki variable `DATABASE_URL` yang menunjuk ke PostgreSQL Railway.
5. Tambahkan `AUTH_SECRET` dengan random string yang panjang.
6. Deploy.

V5 sengaja memisahkan proses build dan database:

- Build: `npx prisma generate && npm run build`
- Start/deploy: `npx prisma db push && node prisma/seed.mjs && npm run start`

Ini penting karena private hostname `postgres.railway.internal` dapat tidak tersedia saat image build, tetapi tersedia ketika service berjalan di private network Railway.

## Login demo

Setelah deployment berhasil, seed idempotent otomatis membuat:

- Admin: `admin@example.com` / `Admin123!`
- Requester: `requester@example.com` / `Admin123!`
- Approver: `approver@example.com` / `Admin123!`
- Procurement: `procurement@example.com` / `Admin123!`

Ganti password/demo account sebelum production.

## Environment variables

Lihat `.env.example`.

Untuk Accurate Online, isi token/host/session dan endpoint transaksi sesuai API Developer Accurate yang digunakan perusahaan Anda.
