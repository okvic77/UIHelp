FROM iojs:3

RUN mkdir /app
COPY ./package.json /app/package.json
RUN cd /app && npm install

COPY . /app

EXPOSE 3000

CMD cd /app && node web
