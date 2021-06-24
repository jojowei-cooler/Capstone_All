FROM ubuntu:20.04

#Update 
RUN apt-get update

#Install Nginx, php-fpm and superfisord as a dependencies from ubuntu repository
RUN apt-get install -y nginx supervisor && \
    rm -rf /var/lib/apt/lists/*
    
#Configuring those dependencies,

#Define the ENV variable
ENV nginx_vhost /etc/nginx/sites-available/default
ENV nginx_conf /etc/nginx/nginx.conf
ENV supervisor_conf /etc/supervisor/supervisord.conf
ENV nginx_html /var/www/html/index.nginx-debian.html

COPY default ${nginx_vhost}
COPY supervisord.conf ${supervisor_conf}
COPY ./index.nginx-debian.html ${nginx_html}

RUN echo "\ndaemon off;" >> ${nginx_conf}

#Create a new directory for php-fpm, changing /var/www/html owner directory and PHP directory to www-data
RUN chown -R www-data:www-data /var/www/html 
#Throw the keys into container

#Define the volume, so we can mount the directories listed to the host machine

#Volume config
VOLUME ["/etc/nginx/sites-enabled", "/etc/nginx/certs", "/etc/nginx/conf.d", "/var/log/nginx", "/var/www/html"]

#Last but not least, setup the default container command CMD and open the port for HTTP and HTTPS.

#Creating a new start,sh file for default CMD command when container is starting. This file contains the supervisord command, and copy the file to the new image with the COPY docker command.

#Configure Services and Port
COPY start.sh /start.sh
CMD ["./start.sh"]
 
EXPOSE 80 443