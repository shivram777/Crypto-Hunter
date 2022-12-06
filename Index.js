const express=require('express');
const connectToDB=require('./db');
var cors = require('cors');
const dotenv=require('dotenv');
const path=require('path')

const app=express()
const PORT= process.env.PORT||5000;

dotenv.config();
connectToDB();

app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/Auth'))
app.use('/api/watchCoin',require('./routes/WatchCoin'))

//---------------deployment-------------------------

// __dirname1=path.resolve();

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname1,'/FrontEnd/build')));

//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname1,"FrontEnd","build","index.html"))
//     })
// }else{
//     app.get("/nothing",(req,res)=>{
//         res.send('not working properlly')
//     })
// }


//----------------------------------------------------


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})


