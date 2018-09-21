FROM php:7.2-cli-alpine

ENV DEPLOYER_VERSION latest

RUN apk add --no-cache tzdata bash curl

COPY entrypoint.sh /usr/local/bin/

RUN chmod o+x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]

CMD ["dep"]
