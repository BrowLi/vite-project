FROM node:lts
# RUN npm install pm2 -g
RUN yarn config set registry 'https://registry.npm.taobao.org'

WORKDIR /vite-project
COPY package.json pnpm-lock ./

RUN pnpm build
cp -Rf ./dist/ /app_static/

EXPOSE 3000
