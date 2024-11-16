# Assignment Submission Portal

## Steps to setup and run the system

### Make a directory

```
mkdir Project
```

### Clone the repository into the directory

```
git clone https://github.com/Yash985/Assignment_Submission_Portal.git
```

### cd into the Project directory

```
cd Project
```

### Run the following command to install the dependencies

```
npm install
```

### Copy content from .env.example in .env file in root directory

```
MONGODB_URL=
JWT_SECRET=
PORT=
```

### To start the server with node run the following command

```
npm run server
```
### OR
### To start the server with nodemon run the following command

```
npm run start
```


## Use can POSTMAN to test the API

### API Supports following Endpoints

~~~
*For Users*

POST /user/register
POST /user/login
POST /user/upload
GET /user/admins


*For Admins*

POST /admin/register
POST /admin/login
POST /admin/assignments/:id/accept
POST /assignments/:id/reject
GET /admin/assignments
~~~

#### Dummy data to get you started

```
Admins=[
    {
    userId:"Alok",
    password:"12345678",
},
{
    userId:"Ram",
    password:"12345678"
}]

Users=[
    {
        userId:"Yash",
        password:"yashyash",
    },
    {
        userId:"Virat",
        password:"virat0018"
    }
]
```
