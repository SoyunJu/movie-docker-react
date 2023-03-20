FROM alpine AS init			
RUN mkdir /my-app				
WORKDIR /my-app				
ARG GIT_REPOSITORY_ADDRESS		
RUN apk update && apk add git && git clone $GIT_REPOSITORY_ADDRESS


FROM    node  AS builder
RUN     mkdir /movie-react
WORKDIR /movie-react
COPY    . .
ARG     REST_API_SERVER_IP              
ARG     REST_API_SERVER_PORT          
RUN     echo REACT_APP_IP=$REST_API_SERVER_IP > .env    
RUN     echo REACT_APP_PORT=$REST_API_SERVER_PORT >> .env 
RUN     npm install
RUN     npm run build


FROM    nginx AS runtime
COPY    --from=builder /movie-react/build/ /usr/share/nginx/html/
RUN     rm /etc/nginx/conf.d/default.conf
COPY    ./nginx.conf /etc/nginx/conf.d
CMD     ["nginx", "-g", "daemon off;"]
