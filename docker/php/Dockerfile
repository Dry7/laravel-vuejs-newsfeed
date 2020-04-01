FROM php:7.4.4-fpm-alpine3.11

RUN apk add --no-cache $PHPIZE_DEPS postgresql-dev \
    && apk add --no-cache libpq \
    && pecl install xdebug-2.9.0 \
    && docker-php-ext-install pdo_pgsql pgsql \
    && docker-php-ext-enable xdebug

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/bin --filename=composer

COPY ./ini/xdebug.ini /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
COPY ./ini/php.ini /usr/local/etc/php/conf.d/docker-php.ini

RUN addgroup -S newsfeed && adduser -S newsfeed -G newsfeed -u 1000

USER newsfeed
