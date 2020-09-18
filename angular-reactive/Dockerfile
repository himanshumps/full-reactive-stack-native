# Build stage
FROM node:14 as build-stage
COPY ./ /usr/src/
WORKDIR /usr/src
RUN npm install
RUN npm run ng build --prod

# Compiled app based on nginx
FROM nginx:1.19
# support running as arbitrary user which belogs to the root group
COPY --from=build-stage /usr/src/dist/angular-reactive/ /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx /etc/nginx/conf.d/
# users are not allowed to listen on priviliged ports
EXPOSE 1827
# comment user directive as master process is run as user in OpenShift anyhow
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf
RUN addgroup nginx root
USER nginx
