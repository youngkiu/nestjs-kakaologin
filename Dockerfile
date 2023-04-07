FROM node:18.15 As builder

WORKDIR /usr/src/app
COPY . .

RUN npm install --only=development
RUN npm run build

FROM node:18.15-alpine

RUN apk add bash

ENV NODE_ENV production

WORKDIR /usr/src/app
COPY . .

RUN npm install --only=production
COPY --from=builder /usr/src/app/dist ./dist

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.10.0/wait /wait
RUN chmod +x /wait

# Remove <none> TAG Docker images: docker rmi $(docker images --filter "dangling=true" -q --no-trunc)
