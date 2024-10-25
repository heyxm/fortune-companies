# Family tree API

---

## Installation

Create .env file

```bash
# .env file format
PORT=3000
HOSTNAME=localhost
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=mysql_db_name #fortune_companies
```

Create database from fortune_companies_schema.sql 

```bash
#MySQL Workbench
Server > Data Import > Choose fortune-companies-schema.sql file
```

Install dependencies

```bash
$ npm install
```

## Start dev webserver

```bash
$ npm run dev
```

## Build

```sh
$ npm run build
```

## Start webserver

```bash
$ npm run build
$ npm run start
```
