<h1>Last Time</h1>

App is to keep track of the last time a task was done, and let you know when the next time it is due.
<br><br>
Front end is made in React. 

<br><br>
<h2>Deploying application on digitalocean Ubuntu 18.04</h2><br><br>

1) Create droplet on digitalocean - Ubuntu 18.04 x64 with 1 GB Standard CPU size <br>
2) Take note of your droplet's IP addr <br>
3) In your terminal, SSH into your droplet as root@IPaddr, password will be emailed to you by digitalocean and you will be asked to immediately change it<br>
4) Now you are logged in as root@yourserver <br>
5) Add a new user that is not root: ```# adduser [username]```<br>
6) Add sudo privileges to the new user: ```# usermod -aG sudo [username]```<br>
7) Now SSH into your new user: ```# ssh [username]@[yourserver]```<br>
8) Download NodeJS: ```$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -```</br>
9) Install NodeJS: ```$ sudo apt-get install -y nodejs```<br>
10) ```$ npm --version``` should say 5.6.0 and ```$ node --version``` should say v8.11.3 (7/25/2018) <br>
11) Install MySQL: ```$ sudo apt install mysql-server```<br>
12) Configure MySQL: ```$ sudo mysql_secure_installation```<br>
13) Validate password? N, enter in your new password, answer Y for all future questions<br>
14) Enter MySQL console: ```$ sudo mysql```<br>
15) Create a new user, new database, new table, and insert some values into Tasks table for testing purposes: 
  ```
  mysql> CREATE USER 'mysqluser1'@'localhost' IDENTIFIED BY 'password';
  mysql> GRANT ALL PRIVILEGES ON *.* TO 'mysqluser1'@'localhost';
  mysql> FLUSH PRIVILEGES;
  mysql> CREATE DATABASE lasttime;
  mysql> USE lasttime;
  mysql> CREATE TABLE Tasks (
	TaskName varchar(255) NOT NULL, 
    LastDate date NOT NULL, 
    Frequency int,
    PRIMARY KEY (TaskName)
  );
  mysql> INSERT INTO Tasks VALUES ('Change Readme on github', '2018-07-25', 2);
  mysql> exit;
  ```
  16) Clone this git repository into server: ```$ git clone http://github.com/estherfatehi/LastTime --branch branch1 --single-branch```
  17) Change directory into LastTime: ```$ cd LastTime```
  18) Install everything from the package.json: ```$ sudo npm install``` (if a node_modules folder is already in there, remove it first)
  19) To run the server: (run the server first)
  ```
  $ cd server
  $ node server.js
  ```
  or you can ```$ sudo npm install pm2@latest -g``` and then ```$ pm2 start server.js``` to run it as a forked child in the background<br>
  20) To run the react client side:
  ```
  $ cd ..
  $ npm start
```
  or run it with pm2 ```$ pm2 start "npm start"```
