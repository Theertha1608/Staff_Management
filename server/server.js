const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter=require("./routes/userRoutes")
const educationRouter=require("./routes/educationRoutes")

const app = express();



app.use(cors());
app.use(express.json());


const mongoUri = 'mongodb+srv://Theertha_16:Theertha16@cluster0.bqomf.mongodb.net/';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.log('Error connecting to MongoDB Atlas.:', error));


app.get('/', (req, res) => {
  res.send('Hello, Task Management System!');
});


app.use("/user",userRouter)
app.use("/education",educationRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
