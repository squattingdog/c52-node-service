# Node REST Service
A nodejs server that syncs data from SFDC to a mongoDB in order to expose data for C52 apps through a set of REST routes.

##  Local Machine Setup
### Install node js
* Download from: https://nodejs.org/en/download/
* Run the setup and follow the steps in the wizard for your OS.
  ##### Windows
  * do not use program files or program files x86 for the install location.
  * install them in c:\nodejs or within your local project directory structure i.e. `c:\c52\nodejs>`
* Update npm
  ##### Windows
  * Follow the instructions here: https://github.com/felixrieseberg/npm-windows-upgrade

### Install Redis
##### Windows
* Download from https://github.com/MSOpenTech/redis/releases/download/win-3.2.100/Redis-x64-3.2.100.msi
* Run the installer and accept all defaults.  The port should be 6379.

##### linux

##### OS X

### Install mongoDB (Community Edition)
##### Windows
* Download the latest version from https://www.mongodb.com/download-center?jmp=nav#community
* Install mongoDB using defaults.

##### linux
* Install using yum or apt-get
* or download the latest version from https://www.mongodb.com/download-center?jmp=nav#community

##### OS X
* Install using homebrew
* or download the latest version from https://www.mongodb.com/download-center?jmp=nav#community

#### Configure mongoDB
* Create a data directory where the data files will be stored.  Ensure the process running node has access to read and write to the directory and all of its files.
   * example `e:\c52\dev\mongdb\data>`
* Add the location that was created to the $root/config/mongodb.conf file in storage:dbPath.
* Create a logs folder under $root. (this will eventually be added to the setup script)

#### Start mongoDB
##### Windows
Start mongoDB using the mongod command specifying the config file to use.

	e:\c52\dev\c52-node>mongod -f config\mongo.conf

##### linux

##### OS X

### Create ./config/config.local.js
This file contains all the configuration settings for you local machine.  Create the file in the $root/config directory.  The values in the settings object within 
config.js can be re-defined in config.local.js and will take precedence over the default values defined in config.js.