# Build stage
#imagem de build
FROM node:20 AS builder

#define /app como diretório da aplicação
WORKDIR /app

#copia dependências
COPY package*.json ./
#instala depencencias copiadas
RUN npm install

#copia aplicação do local para o container
COPY . .
#construção
RUN npm run build 

# Serve stage (nginx)
FROM nginx:alpine

#copia aplicação construida para pasta que serve apps no nginx
COPY --from=builder /app/dist /usr/share/nginx/html
#usa porta 8080 do container
EXPOSE 80

#comandos que são executados quando o run for iniciado (docker run ${image}) 
CMD ["nginx", "-g", "daemon off;"]