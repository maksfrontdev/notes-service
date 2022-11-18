# Notes Service

Note taking API service that provides CRUD API for notes app.

## Development

Install project dependencies with Yarn: `$ yarn`

### Run API

```sh
$ yarn api:start:dev
```

**Note:** When you run first time, you will need to copy template .env file:

```sh
$ cp packages/api/.env.template packages/api/.env
```

### Build and run in Docker

Build container and start API dependencies:

```sh
$ docker-compose build
$ docker-compose run start_dependencies
```

Run API: `$ docker-compose up api`

**Note:** When you run first time, you will need to copy template .env file:

```sh
$ cp packages/api/docker.env.template packages/api/docker.env
```

## Linting

Project uses ESLint, stylelint and commitlint:

```sh
$ yarn lint
```

Format code with Prettier:

```sh
$ yarn prettier
```
