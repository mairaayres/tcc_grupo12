FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=db_usuarios
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=password

COPY ./schema.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
