import  express  from "express";
import path from 'path';
import mongoose from "mongoose";
const app =express();
const port =3000;

const users =[]

//used middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(path.resolve(), 'public')))


//create a data base named "Hackathon"
mongoose
  .connect('mongodb://127.0.0.1:27017/Hackathon', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('database connected'))
  .catch(e => console.log(e))

  // making the schema 
  const userSchema =new mongoose.Schema({
    name:String,
    email:String,
    classes:String,
    code:String,
  })

  const User =mongoose.model('User',userSchema)
app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
    res.render('index')
    console.log("it is working ");
})

app.get('/success',(req,res)=>{
    res.render('success');
})

app.post('/Register',async(req,res)=>{
const {name,email,classes,studentcode}=req.body;



    const messageData=({
        name: req.body.name,
        email: req.body.email,
        class: req.body.classes,
    studentcode: req.body.code
      }) 
      await User.create(messageData);
      console.log(messageData)
      users.push(messageData)



    res.redirect('/success')
})
app.get('/users',(req,res)=>{
    res.json({
        users,
    })
})





app.listen(port,(req,res)=>{
    console.log(`App is listening on port ${port}`)
})