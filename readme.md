# Node REST Service
A nodejs server that syncs data from SFDC to a mongoDB in order to expose data for C52 apps through a set of REST routes.

##  Local Machine Setup
### Install node js
* Download from: https://nodejs.org/en/download/
* Run the setup and follow the steps in the wizard for your OS.

### Install Redis
Windows
* Download from https://github.com/MSOpenTech/redis/releases/download/win-3.2.100/Redis-x64-3.2.100.msi
* Run the installer and accept all defaults.  The port should be 6379.

mac / linux

### Install mongoDB (Community Edition)
Windows
* Download the latest version from https://www.mongodb.com/download-center?jmp=nav#community

linux
* Install using yum or apt-get
* or download the latest version from https://www.mongodb.com/download-center?jmp=nav#community

mac
* Install using homebrew
* or download the latest version from https://www.mongodb.com/download-center?jmp=nav#community

#### Configure mongodb
* Create a data directory where the data files will be stored.  Ensure the process running node has access to read and write to the directory and all of its files.
   * example e:\c52\dev\mongdb\data
* Add the location that was created to the $root/config/mongodb.conf file in storage:dbPath.
* Create a logs folder under $root. (this will eventually be added to the setup script)


### Create ./config/config.local.js
This file contains all the configuration settings for you local machine.  Create the file in the $root/config directory.  The values in the settings object within 
config.js can be re-defined in config.local.js and will take precedence over the default values definged in config.js.