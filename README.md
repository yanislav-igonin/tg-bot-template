# Telegram Bot Template

# Stack
- Typescript
- grammY
- Prisma

# Run
1. Install dependencies:
```
npm install
```
2. Make `.env` file from `.env.example`
3. Push database schema:
```
npx prisma db push
```
4. Run bot:
```
npm run dev
```

# Deploy
Can be deployed to any VPS or cloud service. I recommend using [Railway](https://railway.app/) for this purpose.