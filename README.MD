# Books API

Books API adalah aplikasi backend sederhana untuk mengelola data buku menggunakan **Node.js 20**, **Express.js**, dan **PostgreSQL**.

## Fitur
1. API CRUD untuk mengelola data buku.
2. Fetch data dari API eksternal dan menyimpannya ke dalam database.

## Teknologi yang Digunakan
- Node.js 20
- Express.js
- PostgreSQL
- Sequelize (ORM)
- Axios (HTTP Client)
- Joi (Validasi Input)

## Persyaratan
- Node.js versi 20 atau lebih.
- PostgreSQL versi terbaru.
- **npm** atau **yarn** untuk manajemen paket.

## Instalasi
1. Clone repository ini:
   ```bash
   git clone <repository-url>
   cd <nama-folder-proyek>
   ```

2. Instal dependensi:
   ```bash
   npm install
   ```

3. Buat file `.env` di root proyek dan isi dengan konfigurasi berikut:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_NAME=books_db
   PORT=3000
   ```

4. Siapkan database PostgreSQL:
   - Buat database dengan nama yang sesuai dengan `DB_NAME` di `.env`.
   - Jalankan query berikut untuk membuat tabel `books`:
     ```sql
     CREATE TABLE books (
         id SERIAL PRIMARY KEY,
         title VARCHAR(255) NOT NULL,
         author VARCHAR(255) NOT NULL,
         published_date DATE NOT NULL,
         isbn VARCHAR(255) UNIQUE NOT NULL,
         pages INTEGER,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```

5. Jalankan server:
   ```bash
   npm start
   ```

## Cara Menjalankan
1. Jalankan server:
   ```bash
   npm start
   ```

2. Server akan berjalan di `http://localhost:3000`.

## Endpoint API
### Buku
- **GET** `/books`  
  Mendapatkan semua data buku.

- **GET** `/books/:id`  
  Mendapatkan data buku berdasarkan ID.

- **POST** `/books`  
  Menambahkan data buku baru.  
  **Contoh Request Body:**
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "published_date": "2023-01-01",
    "isbn": "1234567890123",
    "pages": 200
  }
  ```

- **PUT** `/books/:id`  
  Memperbarui data buku berdasarkan ID.  
  **Contoh Request Body:**
  ```json
  {
    "title": "Updated Book Title"
  }
  ```

- **DELETE** `/books/:id`  
  Menghapus data buku berdasarkan ID.

### Fetch Data Buku Eksternal
- **POST** `/books/fetch-external`  
  Mengambil data buku baru dari API eksternal [IT Bookstore API](https://api.itbook.store/1.0/new) dan menyimpannya ke dalam database (jika ISBN belum ada).

## Validasi Input
Aplikasi ini menggunakan **Joi** untuk memvalidasi data input di endpoint `POST` dan `PUT`.

## Dokumentasi API
Gunakan **Postman** atau alat lain untuk menguji endpoint. Anda dapat menambahkan dokumentasi lebih lanjut di aplikasi jika diperlukan.

---

Jika Anda mengalami masalah atau memiliki pertanyaan, silakan hubungi saya. 😊

