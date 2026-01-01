  FROM node:23-alpine AS build

  RUN corepack enable && corepack prepare pnpm@latest --activate
  
  WORKDIR /app
  
  COPY pnpm-lock.yaml package.json ./
  RUN pnpm install --frozen-lockfile
  
  COPY . .
  RUN pnpm run build
  
  FROM nginx:alpine
  
  COPY --from=build /app/dist /usr/share/nginx/html
  
  RUN echo 'server { \
      listen 80; \
      location / { \
          root /usr/share/nginx/html; \
          index index.html; \
          try_files $uri $uri/ /index.html; \
      } \
  }' > /etc/nginx/conf.d/default.conf
  
  EXPOSE 80
  CMD ["nginx", "-g", "daemon off;"]
