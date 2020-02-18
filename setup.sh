#!/usr/bin/env bash -v


#######################################################################
# Install MongoDB Community Edition (Ubuntu)                          #
# https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/ #
#######################################################################

# Import the public key used by the package management system.
sudo apt-get install gnupg
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -

# Create a list file for MongoDB.
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list

# Reload local package database.
sudo apt-get update

# Install the MongoDB packages.
sudo apt-get install -y mongodb-org

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