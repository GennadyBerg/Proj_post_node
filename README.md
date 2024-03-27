# HW9
hw9

npm run dev
post   /signin      
      {
            "login": "Gena_5",
            "password": "b9a1527cdc938b6fdc56"
      }

      net access  - anyIp allowwed




https://documenter.postman.com/preview/27403102-8530ae39-00b8-400d-b670-82cdbe450e37?environment=27403102-b719397d-7b56-46f7-8a37-b5a0058b54de&versionTag=latest&apiName=CURRENT&version=latest&documentationLayout=classic-double-column&documentationTheme=dark&logo=https%3A%2F%2Fres.cloudinary.com%2Fpostman%2Fimage%2Fupload%2Ft_team_logo%2Fv1%2Fteam%2Fanonymous_team&logoDark=https%3A%2F%2Fres.cloudinary.com%2Fpostman%2Fimage%2Fupload%2Ft_team_logo%2Fv1%2Fteam%2Fanonymous_team&right-sidebar=303030&top-bar=FFFFFF&highlight=FF6C37&right-sidebar-dark=303030&top-bar-dark=212121&highlight-dark=FF6C37#intro



http://localhost:3000/api/auth/signup
Body raw (json)
http://localhost:3000/api/auth/signin
Body raw (json)
1_Post_project
AUTH
POST Post signup 3000
json
{
"username": "john234_doe9",
"role":3,
"email": "john234_doe@test.com",
"password": "2e8f22-43c6-95fa-dc938b6fdc56"
}
POST Post signin 3000
json
{
"username": "john234_doe9",
"password": "2e8f22-43c6-95fa-dc938b6fdc56"
}
This documentation is not published yet, this is only a preview. Changes to the publishing settings will reload this page.
http://localhost:3000/reset-password-init
http://localhost:3000/me
AUTHORIZATION Bearer Token
Token
http://localhost:3000/users/65ea1d7cd77d8eda680bd81c
AUTHORIZATION Bearer Token
Token
http://localhost:3000/users?sortBy=-username
AUTHORIZATION Bearer Token
Token
PARAMS
sortBy -username
http://localhost:3000/api/auth/refresh-token
GET pass reset init
GET Get Me
DELETE Delete user by Id
GET Get All users
POST Post refresh token 3000
This documentation is not published yet, this is only a preview. Changes to the publishing settings will reload this page.
http://localhost:3000/api/auth/refresh token
AUTHORIZATION Bearer Token
Token
Body raw (json)
http://localhost:3000/posts/65f36e4aac264af8d387a35d
AUTHORIZATION Bearer Token
Token
Body raw (json)
http://localhost:3000/posts?tags=two
json
{
"username": "john234_doe9"
}
Posts
PUT PUT post by id
json
{
"title": "checknew3 put test post by id_post",
"body": "Если1 видим этот пост значит все не зря and put is the best!)))"
}
GET Get All posts+filter_tags
This documentation is not published yet, this is only a preview. Changes to the publishing settings will reload this page.
AUTHORIZATION Bearer Token
Token
PARAMS
tags two
http://localhost:3000/posts
AUTHORIZATION Bearer Token
Token
http://localhost:3000/posts?category=65f98db4e0904205bd866b2e,66031a3054eec5b7848dde1c
AUTHORIZATION Bearer Token
Token
PARAMS
category 65f98db4e0904205bd866b2e,66031a3054eec5b7848dde1c
http://localhost:3000/posts?owner_id=65ea1adbd77d8eda680bd819
AUTHORIZATION Bearer Token
Token
GET Get All posts
GET Get All posts+filter_Categories
GET Get All posts+filter_ownerId
This documentation is not published yet, this is only a preview. Changes to the publishing settings will reload this page.
PARAMS
owner_id 65ea1adbd77d8eda680bd819
http://localhost:3000/posts?sort=_id
AUTHORIZATION Bearer Token
Token
PARAMS
sort _id
http://localhost:3000/posts/65f36e4aac264af8d387a35d
AUTHORIZATION Bearer Token
Token
http://localhost:3000/posts/65f36e4aac264af8d387a35d
AUTHORIZATION Bearer Token
Token
Body raw (json)
GET Get All posts+sort by ...
DELETE Delete post by id
PATCH PATCH post by id
This documentation is not published yet, this is only a preview. Changes to the publishing settings will reload this page.
http://localhost:3000/posts
AUTHORIZATION Bearer Token
Token
Body raw (json)
http://localhost:3000/posts
AUTHORIZATION Bearer Token
Token
Body formdata
image
json
{
"title": "11checknew3 PATCH test post by id_post",
"body": "111Если видим этот пост значит все не зря and PATCH is the best!)))",
"category": "65f98dc8e0904205bd866b31"
}
POST POST create new post by User token
json
{
"title": "12353464356r",
"body": "77771Если видим1 этот пост значит все не зря)))",
"tags": ["goose1", "two1"]
}
POST Create post with upload img
This documentation is not published yet, this is only a preview. Changes to the publishing settings will reload this page.
g
tittle test upload11
body test anyu upload with post11
http://localhost:3000/upload
AUTHORIZATION Bearer Token
Token
Body formdata
imageId 65f36e4aac264af8d387a35d
image
http://localhost:3000/posts/65f36e4aac264af8d387a35d
http://localhost:3000/category
AUTHORIZATION Bearer Token
Token
Body raw (json)
POST Uploadt
GET Get POST by id
Category
POST POST create newCategoty
This documentation is not published yet, this is only a preview. Changes to the publishing settings will reload this page.
http://localhost:3000/category?sortBy=-name
AUTHORIZATION Bearer Token
Token
PARAMS
sortBy -name
http://localhost:3000/category?name=category1
AUTHORIZATION Bearer Token
Token
PARAMS
name category1
http://localhost:3000/category/65f98de0e0904205bd866b34
AUTHORIZATION Bearer Token
Token
json
{
"name": "Test1 Cat111"
}
GET GET Categories sort
GET GET Categories Filter
PUT PUT category by id Copy
This documentation is not published yet, this is only a preview. Changes to the publishing settings will reload this page.
Token
Body raw (json)
http://localhost:3000/commentspost/65fc8529becae8364107e8c8
AUTHORIZATION Bearer Token
Token
Body raw (json)
json
{
"name": "Category 3.2"
}
Comments
PATCH PATCH create newComment to post by id
json
{
"title": "11checknew3 PATCH test post by id_post",
"body": "111Если видим этот пост значит все не зря and PATCH is the best!)))"
}
This documentation is not published yet, this is only a preview. Changes to the publishing settings will reload this page.