FROM nginx

WORKDIR /var/www/app

ADD . .
COPY nginx/etc/nginx /etc/nginx
COPY nginx/docker-entrypoint.sh /

ENTRYPOINT [ "/docker-entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]
