## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Postman URLs

# ---> authentication urls

```bash

# Register
POST https://up-blog-api.vercel.app/api/users/register
    fileds:-
      firstname,lastname, email,password


# Login
POST https://up-blog-api.vercel.app/api/users/login
    fileds:-
      email,password


```

# ---> reset pass by email

```bash

# To send mail with reset password
POST https://up-blog-api.vercel.app/api/pass/resetMail
    fileds:-
      email


# To change password
# at your mail will find link like this
GET https://up-blog-api.vercel.app/api/pass/resetPass/ibrahimelgadid30@gmail.com/c358087e-6fa1-4a52-b084-732255b87ee0

  fileds:-
      password

# To get all registered users
GET https://up-blog-api.vercel.app/api/users



```
