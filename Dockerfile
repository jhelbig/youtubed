FROM node
MAINTAINER Jake <jake@jakehelbig.com>

ENV DOWNLOAD_DIRECTORY="/downloads"
ENV NOTIFICATION_TYPE="slack"
ENV NOTIFICATION_STATE="false"
ENV START_MESSAGE="*@title* has begun download"
ENV FAILED_MESSAGE="*@title* has failed to download"
ENV COMPLETE_MESSAGE="*@title* has completed download"
ENV DOMAIN="localhost"
ENV API_PORT="8443"
ENV APP_PORT="8080"

RUN \
    echo "**** install required packages ****" && \
    apt-get update && \
    apt-get install -y --no-install-recommends gettext && \
    apt-get autoclean

RUN mkdir /downloads

ADD . /app

RUN chmod +x /app/startup.sh

WORKDIR /app

RUN npm install && \
    npm run-script build && \
    rm -fR e2e src && \
    rm -f *.json README.md && \
    rm -fR node_modules && \
    npm i express cors node-slackr youtube-dl

ENTRYPOINT ["/app/startup.sh"]
