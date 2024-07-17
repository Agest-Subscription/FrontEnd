FROM node:20.15.1-alpine AS base

FROM base AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

RUN rm .env

FROM base AS runner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV PORT 3000

CMD ["node", "server.js"]
