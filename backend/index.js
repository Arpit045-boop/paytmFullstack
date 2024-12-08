const express = require("express");
const cors = require("cors");
// const bodyParser = 

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

const mainRouter = require("./routes/index");
app.use("/api/v1",mainRouter);


app.listen(3000,()=>{
    console.log("Listening....");    
});