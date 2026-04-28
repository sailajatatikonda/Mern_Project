
// const express = require ('express')

// const app = express();
// app.use(express.json()); 
// let todo = []

// app.post('/todo',(req,res)=>{
//     const {title,description}=req.body;
//     const new_todo = {
//         id : todo.length + 1,
//         title,
//         description
//     };
//     todo.push(new_todo)
//     console.log(todo);
//     res.status(200).json(new_todo);
// })

// const port = 3000;
// app.listen(port,()=>{
//     console.log("port:"+port)
// })


// const express = require ('express')

// const app = express();
// app.use(express.json()); 
// let todo = []

// app.post('/todo',(req,res)=>{
//     const {title,description}=req.body;
//     const new_todo = {
//         id : todo.length + 1,
//         title,
//         description
//     };
//     todo.push(new_todo)
//     console.log(todo);
//     res.status(200).json(new_todo);
// })
 
// app.get('/todo',(req,res)=>{
//     res.json(todo);
// })
// const port = 3000;
// app.listen(port,()=>{
//     console.log("port:"+port)
// })



// const express = require ('express')

// const mongoose = require ('mongoose')

// const app = express();
// app.use(express.json()); 
// mongoose.connect('mongodb://localhost:27017/todo_database')
// .then(()=>console.log("connected"))
// .catch((err)=>console.log(" not connected"+err))
// const todoschema = new mongoose.Schema({
//   title :String,
//   description :String
// })
// const todoModel = mongoose.model('task', todoschema)
// app.post('/todo',async(req,res)=>{
//     const {title,description}=req.body;
//     try{
//        const  newtodo = new todoModel({title,description})
//        await newtodo.save();
//        res.status(200).json(newtodo);
//     }
//     catch
//     {
//        console.log("error")
//        res.status(500);
//     }
    
// //     };
// //     todo.push(new_todo)
// //     console.log(todo);
// //     res.status(200).json(new_todo);
// })
 
// app.get('/todo',(req,res)=>{
//     res.json(todo);
// })
// const port = 3000;
// app.listen(port,()=>{
//     console.log("port:"+port)
// })


//express
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
//obj
const app=express();

app.use(express.json());//for 505 error we need to do this-->middle ware to convert the data into json
// let todo = []--->for the data in the js we created a list 
app.use(cors())
mongoose.connect('mongodb://localhost:27017/todo_database')
.then( ()=>console.log("connected"))
.catch( ()=>console.log("not connected"+err));
const todoschema=new mongoose.Schema({
    title:String,
    description:String
})
const todoModel=mongoose.model('task',todoschema)
app.post('/todo',async(req,res)=>{
    const {title,description}=req.body;
    try{
        const newtodo=new todoModel({title,description});
        await newtodo.save();
        res.status(200).json(newtodo);
    }
    catch{
        console.log("error");
        res.status(500);
    }
    // const {title,description}=req.body;//-->destruction:To bring the data from the req.body
    // const new_todo={
    //     id : todo.length+1,
    //     title,
    //     description
    // };
    // todo.push(new_todo)
    // console.log(todo)
    // res.status(200).json(new_todo);
})
app.get('/todo',async(req,res)=>{
    try{
        const todo=await todoModel.find()
        res.json(todo);
    }
    catch{
        console.log("error");
        res.status(500);
    }
    // res.json(todo)
})
app.put('/todo/:id',async(req,res)=>{
    const {title,description}=req.body;
    const id=req.params.id
    try{
        const u_todo=await todoModel.findByIdAndUpdate(
            id,
            {title,description},
            {new:true}
        )
        if (u_todo){
            res.json(u_todo)
        }
        else{
            res.status(404).json({message:"error"})
        }
    }
    catch{
        console.log("error");
        res.status(500);
    }
})
app.delete('/todo/:id',async(req,res)=>{
    try{
        const id=req.params.id;
    await todoModel.findByIdAndDelete(id);
    res.status(200).end();//res.end()--> for ending the process after the data is deleted
    }
    catch{
        console.log("error");
        res.status(500);
    }
})
// app.get('/',(req,res)=>{
//     res.send("working")
// });
const port=3000;
app.listen(port,()=>{
    console.log("port: "+port);
})