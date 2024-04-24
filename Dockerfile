FROM node:bullseye

ENV WORKDIR /app
WORKDIR $WORKDIR
ADD client ${WORKDIR}/client
ADD server ${WORKDIR}/server
RUN cd client && npm install && npm run build && \ 
    mv out ${WORKDIR}/server/src/public
RUN rm -rf ${WORKDIR}/client
RUN cd server && npm install
WORKDIR $WORKDIR/server
CMD ["npm", "run", "dev"]