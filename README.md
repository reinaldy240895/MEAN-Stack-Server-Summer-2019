# Canorea (Study Abroad Agency)

This repository is the server-side of the *private/business project* for Canorea (Study Abroad Agency for Koreans to study in Canada).

For production-ready web application, click [here](http://canorea.kr/).

## Setup

You will need Git, Node.js (Version 12.16.1 or later) and NPM (Install with Node.js) installed on your machine.

### macOS with [Homebrew](https://brew.sh/) Package Manager

Open up a Terminal and type:

```bash
brew update
brew install node git
sudo npm install -g npm
```

### Cloning this repository onto your local machine

Open up a Terminal, `cd` to your preferred directory and type:

```bash
git clone git@github.com:j-shim/MEAN-Stack-Server-Summer-2019.git
```

*Note:* If `git clone` fails, confirm that your [SSH Key](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2) is set up and registered properly.

## Usage

### Development Server

Open up a Terminal, cd to the repo and type:

```bash
sudo npm install -g npm # updates npm
sudo npm install # installs node modules
npm run start:dev # alias for nodemon server.js
```

*Note:* Config file is required (e.g. .env).

If successful, the output should be similar to:

```bash
Server is up and running on port 3000!
MongoDB connected successfully!
```

### Production

See setup script `setup.sh`.

## Author

* **June Shim** - jys2@sfu.ca / [GitHub](https://github.com/j-shim)
