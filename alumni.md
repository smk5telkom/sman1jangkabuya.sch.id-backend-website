# Alumni - API Form Pendaftaran Alumni

## Deskripsi

Modul **Alumni** menangani data pendaftaran alumni sekolah. Menyediakan CRUD lengkap dengan upload foto.

---

## Model Database (Prisma)

**Enum `Gender`:** `LakiLaki`, `Perempuan`

**Tabel `Alumni`:**

| Field                        | Tipe         | Keterangan                           |
| ---------------------------- | ------------ | ------------------------------------ |
| `id`                         | `Int`        | Primary key (auto increment)         |
| `nis`                        | `String`     | NIS (unique)                         |
| `namaLengkap`                | `String`     | Nama lengkap                         |
| `jenisKelamin`               | `Gender`     | Laki-laki / Perempuan                |
| `tanggalLahir`               | `DateTime`   | Tanggal lahir                        |
| `tahunLulus`                 | `Int`        | Tahun lulus                          |
| `riwayatPendidikanPekerjaan` | `String?`    | Riwayat pendidikan/pekerjaan (opsional) |
| `alamat`                     | `String`     | Alamat                               |
| `email`                      | `String`     | Email                                |
| `noHp`                       | `String`     | Nomor HP                             |
| `foto`                       | `String?`    | URL foto (opsional)                  |
| `createdAt`                  | `DateTime`   | Waktu dibuat (auto)                  |

---

## API Endpoints

### `POST /alumni` (Protected)

Mendaftarkan alumni baru (multipart/form-data).

| Field                          | Tipe     | Wajib | Keterangan                    |
| ------------------------------ | -------- | ----- | ----------------------------- |
| `nis`                          | `string` | Ya    | NIS unik                      |
| `namaLengkap`                  | `string` | Ya    | Nama lengkap                  |
| `jenisKelamin`                 | `string` | Ya    | `LakiLaki` atau `Perempuan`   |
| `tanggalLahir`                 | `string` | Ya    | Format ISO (`YYYY-MM-DD`)     |
| `tahunLulus`                   | `number` | Ya    | Tahun lulus                   |
| `riwayatPendidikanPekerjaan`   | `string` | Tidak | Riwayat pendidikan/pekerjaan  |
| `alamat`                       | `string` | Ya    | Alamat lengkap                |
| `email`                        | `string` | Ya    | Alamat email                  |
| `noHp`                         | `string` | Ya    | Nomor HP                      |
| `foto`                         | `file`   | Tidak | File gambar (jpg/jpeg/png/webp, max 2MB) |

**Response (201 Created):**
```json
{
  "id": 1,
  "nis": "12345",
  "namaLengkap": "John Doe",
  "jenisKelamin": "LakiLaki",
  "tanggalLahir": "2000-01-15T00:00:00.000Z",
  "tahunLulus": 2018,
  "riwayatPendidikanPekerjaan": "Universitas ABC",
  "alamat": "Jl. Contoh No. 1",
  "email": "john@example.com",
  "noHp": "08123456789",
  "foto": "/uploads/alumni/123456789-987654321.jpg",
  "createdAt": "2026-07-15T00:00:00.000Z"
}
```

---

### `GET /alumni` (Public)

Mendapatkan semua data alumni (diurutkan dari terbaru).

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "nis": "12345",
    "namaLengkap": "John Doe",
    ...
  }
]
```

---

### `GET /alumni/:id` (Public)

Mendapatkan detail alumni berdasarkan ID.

**Response (200 OK):** Sama seperti response create.

**Response (404 Not Found):**
```json
{
  "message": "Not Found",
  "statusCode": 404
}
```

---

### `PATCH /alumni/:id` (Protected)

Memperbarui data alumni (multipart/form-data). Semua field opsional.

**Response (200 OK):** Data alumni yang sudah diperbarui.

---

### `DELETE /alumni/:id` (Protected)

Menghapus data alumni.

**Response (200 OK):** Data alumni yang dihapus.

---

## Struktur File

```
src/alumni/
├── alumni.module.ts
├── alumni.controller.ts
├── alumni.service.ts
├── dto/
│   ├── create-alumni.dto.ts
│   └── update-alumni.dto.ts
└── entities/
    └── alumni.entity.ts
```

## Upload Foto

- Foto disimpan di `./uploads/alumni/`
- Format yang didukung: `jpg`, `jpeg`, `png`, `webp`
- Maksimal ukuran: **2 MB**
- Nama file: `{timestamp}-{random}.{ext}`
- URL publik: `/uploads/alumni/{filename}`
