# 🎬 Netflix-Style Video Streaming Platform

A video streaming platform inspired by modern OTT services like Netflix and YouTube. This project demonstrates how adaptive video streaming works under the hood using **HLS (HTTP Live Streaming)**, **FFmpeg**, **Node.js**, **Express.js**, **TypeScript**, **Next.js**, **MongoDB**, and **Prisma**.

Instead of serving a single video file, uploaded videos are automatically processed into multiple resolutions, segmented into chunks, and streamed dynamically using HLS playlists.

---

# 🚀 Features

## Video Upload Pipeline

* Upload videos through REST APIs
* Multer-based file handling
* Unique video identification using timestamp-based IDs
* Background video processing

## Adaptive Bitrate Streaming

* Automatic generation of:

  * 1080p
  * 720p
  * 480p
  * 360p

* Creates:

  * Master Playlist (`master.m3u8`)
  * Variant Playlists (`playlist.m3u8`)
  * Video Segments (`.ts`)

## HLS Streaming

* HTTP Live Streaming (HLS)
* Chunk-based video delivery
* Dynamic quality switching based on network conditions
* Browser playback using HLS.js

## Video Processing Status Tracking

* MongoDB + Prisma integration
* Tracks video lifecycle:

```text
PENDING
   ↓
COMPLETED
```

* Prevents users from accessing videos before processing is complete

## Frontend Streaming Experience

* Dynamic streaming routes
* Video playback through HLS.js
* Netflix-style video access using unique video IDs

---

# 🏗️ System Architecture

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    Next.js UI    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Express Backend  │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │                             │
              ▼                             ▼
      ┌────────────────┐        ┌────────────────────┐
      │ MongoDB Atlas  │        │ FFmpeg Processing  │
      │ Prisma ORM     │        │ Pipeline           │
      └────────────────┘        └─────────┬──────────┘
                                           │
                                           ▼
                        ┌────────────────────────────┐
                        │ Multi-Resolution Outputs   │
                        │                            │
                        │ master.m3u8               │
                        │ 1080p/playlist.m3u8       │
                        │ 720p/playlist.m3u8        │
                        │ 480p/playlist.m3u8        │
                        │ 360p/playlist.m3u8        │
                        └──────────┬─────────────────┘
                                   │
                                   ▼
                           ┌──────────────┐
                           │   HLS.js     │
                           │ Video Player │
                           └──────────────┘
```

<img width="1536" height="1024" alt="Image-1" src="https://github.com/user-attachments/assets/9785adc7-d5a9-458f-b638-f2f3eacfe8b8" />

---

# 📂 Project Structure

## Backend

```text
backend
│
├── src
│   ├── controllers
│   │     └── video.controller.ts
│   │
│   ├── routes
│   │     └── video.routes.ts
│   │
│   ├── service
│   │     └── video.service.ts
│   │
│   ├── repository
│   │     └── movie.repository.ts
│   │
│   ├── middlewares
│   │     └── multer.middleware.ts
│   │
│   └── index.ts
│
├── uploads
├── output
└── prisma
```

## Frontend

```text
frontend
│
├── app
│   ├── upload
│   ├── stream
│   │     └── [videoId]
│   │
│   └── page.tsx
│
├── components
│
└── lib
```

---

# 🔄 Complete Request Flow

## 1. Upload Video

User uploads a video:

```text
Frontend
    |
    ▼
POST /api/v1/video/upload
```

The backend receives the file through Multer and stores it temporarily.

---

## 2. Generate Unique Video ID

A unique identifier is generated:

```ts
const videoId = Date.now();
```

Example:

```text
1780591338544
```

Output folder:

```text
output/1780591338544
```

---

## 3. Create Database Record

A movie entry is created in MongoDB.

```text
Movie
 ├── movieId
 ├── processingStatus
 ├── createdAt
 └── updatedAt
```

Initial status:

```text
PENDING
```

---

## 4. Start FFmpeg Processing

The uploaded video is processed into multiple resolutions:

```text
1080p
720p
480p
360p
```

Each resolution generates:

```text
playlist.m3u8
segment001.ts
segment002.ts
segment003.ts
...
```

---

## 5. Generate Master Playlist

A master playlist is created:

```text
master.m3u8
```

Example:

```text
#EXTM3U

1080p/playlist.m3u8
720p/playlist.m3u8
480p/playlist.m3u8
360p/playlist.m3u8
```

The player uses this file to select the appropriate quality.

---

## 6. Update Processing Status

After processing completes:

```text
PENDING
    ↓
COMPLETED
```

The status is updated inside MongoDB using Prisma.

---

## 7. Stream Video

Frontend route:

```text
/stream/:videoId
```

Example:

```text
/stream/1780591338544
```

Frontend checks processing status.

### If Status = PENDING

```text
Still Processing Video...
```

### If Status = COMPLETED

```text
Initialize HLS.js
Load master.m3u8
Start Streaming
```

---

# 🎥 HLS Output Structure

```text
output/
└── 1780591338544
    │
    ├── master.m3u8
    │
    ├── 1080p
    │   ├── playlist.m3u8
    │   ├── segment001.ts
    │   ├── segment002.ts
    │   └── ...
    │
    ├── 720p
    │   ├── playlist.m3u8
    │   └── ...
    │
    ├── 480p
    │   ├── playlist.m3u8
    │   └── ...
    │
    └── 360p
        ├── playlist.m3u8
        └── ...
```


<img width="136" height="267" alt="{F21560D1-1B96-419D-87B4-6A6B41B08A01}" src="https://github.com/user-attachments/assets/2d6a0229-f041-40d6-8eec-da1894cfee35" />

---

# 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* HLS.js

### Backend

* Node.js
* Express.js
* TypeScript
* Multer
* FFmpeg

### Database

* MongoDB Atlas
* Prisma ORM

---

# 🎯 Key Engineering Concepts Demonstrated

* Adaptive Bitrate Streaming
* HTTP Live Streaming (HLS)
* Video Segmentation
* FFmpeg Transcoding
* Background Video Processing
* Repository Pattern
* REST API Design
* Dynamic Routing
* Media Processing Pipelines
* Playlist Generation
* Video Status Tracking
* Multi-Resolution Content Delivery

---

# ⚙️ Local Setup

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create:

```bash
.env
```

Add:

```env
DATABASE_URL=<your-mongodb-atlas-url>
```

Run:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 📈 Future Improvements

## Storage Layer

* AWS S3
* Cloudinary

## Background Jobs

* BullMQ
* Redis Queue

## CDN Delivery

* AWS CloudFront

## Media Processing

* Thumbnail Generation
* Multi-Resolution Image Processing

## Authentication

* JWT Authentication
* User Profiles

## Monitoring

* Upload Analytics
* Processing Dashboard
* Video Consumption Metrics

---

## Code Flow
<img width="1024" height="1536" alt="Image-2" src="https://github.com/user-attachments/assets/b20dda25-c16b-4b4e-9d46-b73aba754f85" />

## Upload Response
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/78a89280-c2ca-4256-9cf1-2ef0b0755973" />
