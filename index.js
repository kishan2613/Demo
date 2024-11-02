const express = require("express");
const app = express();
const port =8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended:true}));

app.set("viewengine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts =[
    {
        id:uuidv4(),
        username: "kishan",
        content: "I got Selected in DRDO",
    },

    {
        id:uuidv4(),
        username: "Ayush",
        content: "I got Selected",
    },

    {
        id:uuidv4(),
        username: "Ansh",
        content: "I won laddoo",
    },
];  

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    
    let{username,content}=req.body;
    let id =uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let post = posts.find((p)=>id === p.id);
    res.render("show.ejs",{post});
});

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
});