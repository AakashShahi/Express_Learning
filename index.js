require("dotenv").config()
const express = require("express");
const connectDB=require("./config/db")
const userRoutes=require("./routes/userRoutes")
const studentRoutes=require("./routes/studentRoutes")
const adminUserRoutes=require("./routes/admin/adminUserRoutes")
const adminStudentRoutes=require("./routes/admin/adminStudentRoutes")
const app = express();

connectDB()

app.use(express.json())//accept json in request

app.use("/api/auth",userRoutes)
app.use("/api/student",studentRoutes)
app.use("/api/admin/user",adminUserRoutes)
app.use("/api/admin/student",adminStudentRoutes)


app.get('/', // "/" root path
    (req, res) => {
        //logic

        return res.status(200).send("Hello world!!!");
    }
)

app.get("/post/:id",
    (req, res) => {
        console.log(req.params.id);// :id
        // get query params
        console.log(req.query);
        return res.status(200).send("Success");
    }
)

const users = [
    { id: 1, name: "Saroj", email: "saroj@gmail.com" },
    { id: 2, name: "Aayush", email: "aloo@gmail.com" },
    { id: 3, name: "Dholu", email: "dol@gmail.com" }
]
// make a get req called /users
// that takes dynamic is as params
// if id is not present in users send bad response with failure
// check url query and serach for name
// if name is present and name matches the user with the id
// send success rezpose with "Success"
// else send 500 rsponse with "Server error"

app.get("/users/:id",  // :id -> dynamic
    (req, res) => {
        let id = req.params.id
        let found;
        for (user of users) {
            if (user.id == id) {
                found = user
                break
            }
        }
        if (!found) {
            return res.status(400).send("Failure")
        } if (req.query.name && req.query.name == found.name) {
            return res.status(200).send("Success")
        } else {
            return res.status(500).send("Server Error")
        }
    }
)


app.get("/users/:id/:name",
    //find the users with id and name
    // if found send 200 success
    // else 400  failures
    (req, res) => {
        let id = req.params.id
        let name = req.params.name
        let found
        for (user of users) {
            if (user.id == id && user.name == name) {
                found = user
                break
            }
        }

        if (found) {
            return res.status(200).send("Success")
        } else {
            return res.status(500).send("Failure")
        }
    }
)


//API
//HTTP REsponse code
//200 -20x -> Success response
//300-30x -> Redirect respnse
//400-40x-> BAd response
//  (404)-> Not found
// (401)-> forbidden
// (403)=> unauthorized
// (500)-50x -> Server error


//multiple request GET,POST,PUT,PATCH,DELETE....
//route blogs
// get blogs
// create blogs
// edit blogs
// delete blogs
let blogs = [
    { id: 1, name: "Nikesh", title: "Trip to Pokhara", desc: "Lorem" },
    { id: 2, name: "Shubham", title: "My life at Softwarica", desc: "Lorem" },
    { id: 3, name: "Kushal", title: "Trip to Kakani", desc: "Lorem" }
]

//local db/blogs
app.get("/blogs/",
    (req, res) => {
        //db to query blogs
        return res.status(200).json(
            {
                "success": true,
                "blogs": blogs
            }
        )
    }
)

//single blogs
app.get("/blogs/:blogId",
    (req, res) => {
        let blogId = req.params.blogId
        //search
        let search
        for (blog of blogs) {
            if (blogId == blog.id) {
                search = blog
                break
            }
        }

        if (search) {
            return res.status(200).json(
                {
                    "success": true,
                    "blog": search
                }
            )
        }
        else {
            return res.status(404).json(
                {
                    "success": false,
                    "message": "Blog not found"
                }
            )

        }
    }
)



//data add/add to blogs
app.post("/blogs/",
    (req,res)=>{
        console.log("Body",req.body)//all request
        //{id:1, name:"asd,title:"123",desc:"123123"}
        //const id=req.body.id
        const {id,name, title,desc}=req.body
        //validation
        if(!id||!name||!title||!desc){
            return res.status(404).json(
                {
                    "success":false,
                    "message":"Not enough data provided"
                    
                }
            )
        }
        blogs.push(
            {
                id,// same key and variable
                name,// name:name
                title,//title:title
                desc
            }
        )

        return res.status(200).json(
            {
                "success":true,
                "message":"Blog added"

            }
        )
    }

)

// update put/patch -> data update
app.put("/blogs/:blogid",
    (req,res)=>{
        let blogId=req.params.blogid
        let foundIdx
        for(blogIdx in blogs){
            if(blogs[blogIdx].id==blogId){
                foundIdx=blogIdx
                break
            }
        }
        const {name,title,desc}=req.body
        blogs[foundIdx].name=name
        blogs[foundIdx].title=title
        blogs[foundIdx].desc=desc
        return res.status(200).json(
            {
                "success":true,
                "message":"Blog updated"
            }
        )

    }
)

//Delete
app.delete("/blogs/:blogId",
    (req,res)=>{
        let blogId=req.params.blogId
        blogs=blogs.filter((blog)=>blog.id!=blogId)
        return res.status(200).json(
            {
                "success":true,
                "message":"Blog deleted"
            }
        )
    }
)


const PORT=process.env.PORT
app.listen(
    PORT,
    () => {
        console.log("Server Running");
    }
)