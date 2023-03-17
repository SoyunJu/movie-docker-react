FROM    node  AS builder
RUN     mkdir /movie-react
WORKDIR /movie-react
COPY    . .
RUN     npm install
RUN     npm run build


FROM    nginx AS runtime
COPY    --from=builder /movie-react/build/ /usr/share/nginx/html/
RUN     rm /etc/nginx/conf.d/default.conf
COPY    ./nginx.conf /etc/nginx/conf.d
CMD     ["nginx", "-g", "daemon off;"]
