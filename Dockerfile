# Stage 1: Build the application
FROM node:18-alpine as build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Stage 2: Serve the build files using 'serve'
FROM node:18-alpine

WORKDIR /app
COPY --from=build /app/dist /app/dist

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "80"]