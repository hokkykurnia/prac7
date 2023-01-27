var express = require("express")
var app = express()
var cors = require("cors");
const { application } = require("express");
let projectCollection;

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

//mongodb
const MongoClient = require('mongodb').MongoClient;

//database connections
const uri = 'mongodb+srv:Hokky:Gardevoir1@applied-software-engine.izynvof.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {useNeewUriParser: true})

const insertProjects = (project,callback) => {
    projectCollection.insert(project,callback);
}

const createCollection = (collectionName) => {
    client.connect((err,db) => {
        projectCollection = client.db().collection(collectionName);
        if(!err){
            console.log('MongoDB Connected')
        }
        else {
            console.log("DB Error: ", err);
            process.exit(1);
        }
    })
}

const cardList = [
    {
        title: "the great wave",
        image: "images/the great wave off kanagawa.jpg",
        link: "About the great wave",
        desciption: "japanese painting of wave"
    },
    {
        title: "the persistence of time",
        image: "images/the persistence of time.jpg",
        link: "About the persistence of time",
        desciption: "spanish surrealist painting"
    }
]

const getProjects = (callback) => {
    projectCollection.find({}).toArray(callback);
}

app.get('/api/projects',(req,res) => {
    getProjects((err,result) => {
        if(err) {
            res.json({statusCode: 400, message: err})
        }
        else {
            res.json({statusCode: 200, message:"Success", data: result})
        }
    })
})

// api
app.post('/api/projects',(req,res) => {
    console.log("new project added", req.body)
    var newProject = req.body;
    insertProjects(newProject,(err,result) => {
        if(err) {
            res.json({statusCode: 400, message: err})
        }
        else {
            res.json({statusCode: 200, message:"Successfully added", data: result})
        }
    })
})

var port = process.env.port || 3000;
app.listen(port,()=>{
    console.log("App listening to: http://localhost:"+port)
    createCollection('Art')
})

let io = require('socket.io')(http);​
io.on('connection', (socket) => {​
  console.log('a user connected');​
  socket.on('disconnect', () => {​
    console.log('user disconnected');​
  });​
  setInterval(()=>{​
    socket.emit('number', parseInt(Math.random()*10));​
  }, 1000);​
});​