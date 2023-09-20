# Express simple authentication

Membuat sistem authentikasi menggunakan arsitektur `MVC` yang dibuat semirip mungkin dengan `Laravel` supaya familiar.

## Fitur

| Nama     | Deskripsi                                                                                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| validasi | memvalidasi input `(required, min, max, email, string)` jika semua valid akan diteruskan ke destinasi request namun jika tidak akan akan dikirimkan pesan kesalahan |

### Cara menjalankan

Buat file `.env` dengan isi konfigurasi sebagai berikut

```.env
JWT_KEY=
APP_PORT=

# database
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
```

import database `auth.sql`

### Cara install

Install package yang diperlukan

```bash
npm install
```

Jalankan mode production

```bash
npm start
```

Jalankan mode development

```bash
npm run dev
```

```bash
npx tsc --watch
```

## Endpoint

1. Register

   ```text
   POST : http://127.0.0.1:{port}/register
   ```

   body parameter

   ```json
   {
     "nama": "",
     "email": "",
     "password": ""
   }
   ```

   response sukses

   ```json
   {
     "status": 200,
     "pesan": "user berhasil didaftarkan"
   }
   ```

   response gagal

   ```json
   {
     "status": 202,
     "pesan": "email rizkimaulana348@gmail.com telah terdaftar"
   }
   ```

   response validasi error

   ```json
   [
     {
       "valid": false,
       "message": "nama tidak boleh lebih panjang dari 20 karakter"
     },
     {
       "valid": false,
       "message": "email tidak sesuai format"
     }
   ]
   ```

2. Login

   ```text
   POST: http://127.0.0.1:{port}/login
   ```

   body parameter

   ```json
   {
     "email": "",
     "password": ""
   }
   ```

   response sukses

   ```json
   {
     "status": 200,
     "token": "eyJhbGc..."
   }
   ```

   response gagal

   ```json
   {
     "status": 202,
     "pesan": "email tidak terdaftar"
   }
   ```

   atau

   ```json
   {
     "status": 202,
     "pesan": "password salah"
   }
   ```

3. data user ( me )

   ```text
    POST : http://127.0.0.1:{port}/me
   ```

   header

   ```text
   authorization: Bearer {token_from_login_endpoint}
   ```

   response sukses

   ```json
   {
     "id": 9,
     "nama": "rizki maulana",
     "email": "rizkimaulana348@gmail.com"
   }
   ```

   response gagal

   ```json
   {
     "status": 403,
     "pesan": "Membutuhkan header authorization"
   }
   ```

   atau

   ```json
   {
     "status": 403,
     "pesan": "Token tidak valid"
   }
   ```
