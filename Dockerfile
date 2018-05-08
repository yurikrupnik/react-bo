FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

COPY dist .

RUN npm install --only=production

EXPOSE 5000
CMD [ "npm", "start" ]