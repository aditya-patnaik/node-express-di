# node-express-di
Simple REST service using Node + express + inversify (Node v16.1.0)<br/><br/>
![](https://raw.githubusercontent.com/inversify/inversify.github.io/master/img/cover.jpg)<br/><br/>

###### Salient Features
* The project is primarily based on **typescript**. As a result *js files are found in __ts__ extension*
* Server side code is implemented using **Node.js** and **Express** framework with a typescript flavor
* Server implements **Dependency Injection** using *IOC / DI containers* provided by [Inversify](https://inversify.io/)
* [Mongoose](https://mongoosejs.com/) is used as ORM for MongoDB
* *Sample model and repository* is used as a template that can be further used for other schemas and models depending on the use-case
* Sample controller and service files are added and injected into container serving as a template
* A simple endpoint is exposed for adding sample item into the DB that can be used as a reference for other endpoints depending on the use-case
<br/><br/>

###### Folder structure
* The **root** contains all the **config files** namely **tsconfig**
* The **source code** is organised inside **src** which is further nested inside a *server* folder
* **server folder** is further divided into *subfolders based on the functionalities*
<br/><br/>

###### Configurations
* tsconfigs are used for specifying how typescript has to be used for compiling ts files into corresponding js counterparts
* **tsconfig.json** is the base config while which is extended by **tsconfig.server.json** which is used to specify *server compilation configuration*
* `src/server/configs/config` contains server and DB config that are essential for running of the server and connecting with Database respectively
<br/><br/>

###### NPM Scripts
* `yarn build` builds the code inside *src/server* folder and places it in *dist/server*
* `yarn start-dev-server` starts the dev server using **nodemon** which allows **hot-reloading**

