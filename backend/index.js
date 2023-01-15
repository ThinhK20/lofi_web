const express = require("express") 
const cors = require("cors")
const dotenv = require("dotenv")
const cookieParser =require("cookie-parser") 
const authRouter = require("./routes/authRouter") 
const mongoose = require("mongoose") 
const imageRouter = require('./routes/imageRouter') 
const videoRouter = require('./routes/videoRouter')
const audioRouter = require('./routes/audioRouter')  
const morgan = require('morgan')

dotenv.config()
const app = express(); 


app.use(cors())

mongoose.connect(process.env.MONGOOSE_URL, () => {
    console.log("Connected to database")
})

app.use(morgan('combined'))
app.use(cookieParser())  
app.use(express.json())
app.use(express.urlencoded({ extended: true}))


app.use("/v1/auth", authRouter) 
app.use("/v1/image", imageRouter)
app.use("/v1/video", videoRouter)
app.use("/v1/audio", audioRouter)



app.listen(8000, () => {
    console.log("Server is running at http://localhost:8000")
})