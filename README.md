# Telegram Bot Template


# Stack
- Typescript
- grammY
- TypeORM

# Run
1. Install dependencies:
```
npm install
```
2. Make `.env` file from `.env.example` and provide `BOT_TOKEN` and `ALLOWED_USERNAMES` values.
  `ALLOWED_USERNAMES` is a comma-separated list of telegram usernames of bot admins.
3. Run postgresql database via provided docker-compose file:
```
docker compose up
```
4. Run initial database migration through special script:
```
npm run db
```
5. Run bot:
```
npm run dev
```

# Deploy
Can be deployed to any VPS or cloud service. I recommend using [Railway](https://railway.app/) for this purpose.