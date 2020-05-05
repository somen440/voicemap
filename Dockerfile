FROM nginx

WORKDIR /var/www/app

ADD . .
COPY nginx/etc/nginx /etc/nginx
COPY nginx/docker-entrypoint.sh /

ARG API_KEY
ENV API_KEY ${API_KEY}

ENTRYPOINT [ "/docker-entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]
