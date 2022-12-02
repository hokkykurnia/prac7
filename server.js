var express = require("express")​
var app = express()​
var port = process.env.port || 3000;​

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({extends: false}))

//const addNumbers = (numver1, number2) => {
//    var num1 = parseInt(nuumber1)
//    var num2 = parseInt(nuumber2)
//   var result = num1+num2;
//    return result;
//}

//app.get("/addTwoNumbers", (req,res) => {
//    var numver1 = req.query.number1;
//    var numver2 = req.query.number2;
//    var result = addNumbers(number1, number2)
//    res.json({statusCode: 200, data: result, message:'Success'})
//})

var port = process.env.port || 3000;

app.listen(port,()=>{​
    console.log("App listening to: http://localhost:"+port)​
})