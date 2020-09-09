# GraphQL todolist server

## project setup
```
git clone
npm init -y
npm i 
npx prisma init
npx prisma migrate save --name init --experimental
npx prisma migrate up --experimental
npx prisma generate
node index.js

```
modefy .env and prisma/.env file 
run localhost:4000 on your browser

## GraphQL interface command
### SignUp:
```
mutation {
  signup(
    name: "__yourname__"
    email: "__your@email.com__"
    password: "__yourpassword__"
  ) {
    token
    user {
      id
    }
  }
}
```


### Login:
```
mutation {
  login(
    email: "__your@email.com__"
    password: "__yourpassword__"
  ) {
    token
    user {
      id
      name
      posts{
        id
        title
      }
    }
  }
}
```

### add todo:

#### 1.copy your token to bottom left coner Header

```
{ "Authorization": "Bearer __Token__" }
```

#### 2.copy to left command field
```
mutation {
  upsertPost(
    postId:"0"
    title: "your todo item"
  ) {
    id
    title
  }
}
```

### delete todo:
```
mutation {
  deletePost(
    postId:"__Id__" 
  ) {
    id
  }
}
```
