FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY proto ./proto
RUN npm ci

COPY . .
RUN npm run build

# Stage de production
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/proto ./proto

EXPOSE 4000
CMD ["node", "dist/index.js"]