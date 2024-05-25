# Brilliant

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository for **FMS** backend project.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

Nest is [MIT licensed](LICENSE).

## Source Folder Structure

```
  src
  │
  ├── core
  │   │
  │   ├── constants
  │   ├── exceptions
  │   ├── decorators
  │   ├── auth
  │   ├── providers
  │   ├── guards
  │   ├── utils
  │   ├── interceptors
  │   └── filters
  │       ├── http exceptions
  │       └── ...
  │
  └── modules
      │
      ├── user
      │   │
      │   ├── entities: schema (interface)
      │   ├── dtos/ presenters/ view-models
      │   ├── services: business logic & external apis integration
      │   └── controllers/ route-handler
      │
      ├── article
      │
      └── ...
```
