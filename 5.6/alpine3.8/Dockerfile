FROM php:5.6-cli-alpine3.8

WORKDIR /app

RUN apk add --no-cache tzdata bash curl

COPY entrypoint.sh /usr/local/bin/

RUN chmod o+x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]

CMD ["dep"]