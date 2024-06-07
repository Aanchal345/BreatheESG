require('dotenv').config();
const express=require('express');
const app=express();
app.use(express.json());

const dbConfig= require('./config/dbConfig.js');
const usersRoute= require('./routes/userRoute.js');

app.use("/api/users",usersRoute);

// deployment config
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
    });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Process started at on ${PORT}`);
})