// import express

let express = require('express')
let mongoose = require('mongoose')
let prog = require('./programming')
let cors = require('cors')

// create express app

let app = express()

// enable express app to use JSON content-type

app.use(express.json())

// enable cors in express app

app.use(cors())

// define a port where API will be exposed

let PORT = 8080

// setup temporary data source

let videos = [
    {
        "id": 1,
        "videoid":"OI0F-zEhPJw",
        "title": "Learn how to use REST API"
    },
    {
        "id": 2,
        "videoid":"OI0F-xAhCJo",
        "title": "Learn how to use REST API 2"
    }
]

// setup connection string

let connectionString ="mongodb+srv://zhenZhen:zhenmongodb@cluster0.oz5ypeo.mongodb.net/youtube"

// use connectionString to connect to db

mongoose.connect(connectionString)

let db = mongoose.connection

// check if connection was success

db.once('open', ()=>{
    console.log("Connected to the mongodb in cloud")
})

// create first API
// http://localhost:8080/youtube/welcome
// API URL -> http://localhost:8080/youtube/welcome
// API endpoint -> /youtube/welcome

app.get("/youtube/welcome", (request,response)=>{
    // API implementation
    console.log("endpoint called: /youtube/welcome with GET request");
    response.send("Hello from youtube server, GET")
})

// create second API
// http://localhost:8080/youtube/welcome
// API URL -> http://localhost:8080/youtube/welcome
// API endpoint -> /youtube/welcome

app.post("/youtube/welcome", (request,response)=>{
    // API implementation
    console.log("endpoint called: /youtube/welcome with POST request");
    response.send("Hello from youtube server, POST")
})

// GET http://localhost:8080/youtube/all

app.get("/youtube/all", (request, response) => {
    console.log("endpoint called: /youtube/all with GET request")
    // response.send(videos)
    // connect to mongodb in cloud and get all documents

    prog.find({})
        .then ((data)=>{
            console.log(data)
            response.json(data)
        })
        .catch ((error)=>{
            console.log(error)
            response.json(error)
        })
})

// POST http://localhost:8080/youtube/add
// response.body
// {
//     "id": 7,
//     "videoid":"KsXp22QLMv0",
//     "title": "Learn how to use REST API 7"
// }

app.post("/youtube/add", (request, response)=>{
    console.log("endpoint called: /youtube/add with POST request")
    //console.log(request)
    console.log(request.url)
    console.log(request.method)
    console.log(request.body)
    //add or push the value in request.body to videos array
    // videos.push(request.body)
    //send back the updated videos array as response
    // response.send(videos)

    console.log("before creating instance of programming model");

    let newVideo = new prog({
        id:request.body.id,
        title:request.body.title,
        videoid:request.body.videoid
    })

    console.log("after creating instance of programming model");
    console.log(newVideo);

    // save the newVideo

    newVideo.save()
            .then((data)=>{
                //console.log(response);
                response.json({
                    "status":"success",
                    "data": data
                })
            })
            .catch((error)=>{
                response.json(error)
            })
})

// start/fire API at given port
app.listen(PORT, ()=>{
    console.log("Listening to port: " + PORT);
})

/*
GET -> retrive the resource
POST -> add the new resource
PUT -> update the resource
DELETE -> delete the resource

*/