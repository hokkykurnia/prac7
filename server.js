var express = require("express")
var app = express()
var cors = require("cors")
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
app.get('/api/projects',(req,res) => {
    res.json({statusCode: 200, data: cardList, message:"Success"})
})

var port = process.env.port || 3000;
app.listen(port,()=>{
    console.log("App listening to: "+port)
})

var port = process.env.port || 3000;

app.listen(port,()=>{
    console.log("App listening to: http://localhost:"+port)
    createCollection('Art')
})
