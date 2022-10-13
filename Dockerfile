# To deploy development code

# FROM node:16-alpine
# WORKDIR /app
# COPY . .
# RUN npm install
# EXPOSE 3000
# CMD ["npm","start"]

# To deploy production code 
FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install --force
# RUN npm prune --production
RUN npm run build
RUN npm install -g serve
EXPOSE 3000

CMD ["serve","-s","build", "-l", "3000" ]
