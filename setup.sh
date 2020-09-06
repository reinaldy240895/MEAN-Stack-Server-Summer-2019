#!/usr/bin/env bash -v

#######################################
# Instructions for setting up AWS EC2 #
#######################################

##########################################
# PART 1 (Run these on your dev machine) #
##########################################

# The aws key must not be publicly viewable for SSH to work
# chmod 400 /path/to/aws-key.pem

# ssh -i <path-to-key-file> ubuntu@<domain name>

###############################################
# PART 2 (Run these on the Ubuntu web server) #
###############################################

##################
#   NODE & NPM   #
##################

# add nodejs 12 ppa (personal package archive) from nodesource
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

# install nodejs and npm
sudo apt install -y nodejs

###########
#   PM2   #
###########

# install pm2 with npm
sudo npm install -g pm2

# set pm2 to start automatically on system startup
sudo pm2 startup systemd


#############
#   NGINX   #
#############

# install nginx
sudo apt install -y nginx


######################
#   UFW (FIREWALL)   #
######################

# allow ssh connections through firewall
sudo ufw allow OpenSSH

# allow http & https through firewall
sudo ufw allow 'Nginx Full'

# enable firewall
sudo ufw --force enable

###############################
# Deploy Node.js Back-end app #
###############################

# sudo git clone <git-repo> /opt/back-end

# cd /opt/back-end && sudo npm i

# sudo pm2 start server.js --time

################################
# Backend Deployment Checklist #
################################

# Remove public/
# Remove /api/ prefix in server.js
# Run: sudo npm i
# Update .env

################################
# Deploy Angular Front-end app #
################################

# sudo mkdir /opt/front-end

# sudo chown ubuntu:ubuntu /opt/front-end

# scp -i <path-to-key-file> -r <path-to-local-dist-folder>/* ubuntu@<domain name>:/opt/front-end

##################################################################
# Configure NGINX to serve the Node.js API and Angular front-end #
##################################################################

# Open NGINX site config file (Empty default config):
# sudo vi /etc/nginx/sites-available/default

# And paste in the following config (without echo command):

echo '
server {
  charset utf-8;
  listen 80 default_server;
  # server_name canorea.kr www.canorea.kr;
  server_name _;

  # angular app & front-end files
  location / {
    root /opt/front-end;
    try_files $uri /index.html;

    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  # node api reverse proxy
  location /api/ {
    proxy_pass http://localhost:3000/;
  }
}
'

# Finally, restart NGINX
# sudo systemctl restart nginx

#########################################################################
# HTTPS / SSL with Let's Encrypt                                        #
# https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx               #
# https://gist.github.com/bradtraversy/cd90d1ed3c462fe3bddd11bf8953a896 #
# canorea.kr -> http://13.125.13.69/                                    #
#########################################################################

# sudo apt remove certbot

# sudo snap install --classic certbot

# sudo certbot --nginx
# or
# sudo certbot certonly --nginx

### Test automatic renewal

# sudo certbot renew --dry-run

#######################################################################
# Install MongoDB Community Edition (Ubuntu)                          #
# https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/ #
#######################################################################

# Import the public key used by the package management system.
sudo apt install gnupg
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -

# Create a list file for MongoDB.
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list

# Reload local package database.
sudo apt update

# Install the MongoDB packages.
sudo apt install -y mongodb-org

#################
# Setup Crontab #
#################

# Copy lines below after running: $ crontab -e

# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0 - 23)
# │ │ ┌───────────── day of the month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
# │ │ │ │ │                                   7 is also Sunday on some systems)
# │ │ │ │ │
# │ │ │ │ │
# * * * * * command to execute

# Uncomment line below
# 0 0 * * * sudo /opt/mongo/mongodump.sh

# END OF COPY LINES

