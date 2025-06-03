FROM node:18.19.0-buster-slim as build

ARG DEPLOY_ENV
ENV DEPLOY_ENV=${DEPLOY_ENV}

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm@8.6.0
RUN pnpm install --frozen-lockfile

COPY . ./
RUN pnpm build
FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

