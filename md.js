const morgan = require('morgan');

const express = require('express'); 
const app = express();
const AppError = require('./AppError');

app.use(morgan('tiny'))



app.get('/dog',(req,res)=>{
    console.log(ok);
    res.send('Dog');
});

app.get('/',(req,res)=>{
    res.send('Home');
});

app.get('/error',(req,res)=>{
    throw new AppError('password required',401);
});

app.use((req,res)=>{
    res.status(404).send('Not Found');
})

app.use((err,req,res,next)=>{
    console.log('This is an error');
    next(err)
})

app.listen(3000,()=>{
    console.log('started');
})

