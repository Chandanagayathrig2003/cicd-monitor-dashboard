# CI/CD Deployment Monitoring Dashboard

Production-style full-stack real-time CI/CD monitoring dashboard.

## Stack
- React + Tailwind
- Node.js + Express
- PostgreSQL + Prisma
- Socket.IO
- Vercel + Render + Neon

## Run

### Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```