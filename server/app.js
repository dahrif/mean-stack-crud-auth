const express = require('express');
const mongoose=require('mongoose');
const ProductData = require('./models/user');
const cors = require('cors');
const bodyparser = require('body-parser');

const userRouter=require('./routes/user');
const checkAuth=require('./middleware/checkAuth');
const app = new express();


const MONGODB_URI=`mongodb+srv://dahri:dahri2021@cluster0.unjrx.mongodb.net/mydb?retryWrites=true&w=majority`;
const PORT = 5000;


app.use(cors());
app.use(bodyparser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.get('/products',(req,res)=>{

    userData.find()
    .then((user)=>{
      console.log(user);
        res.send(user);
    })
})
app.post('/insert',checkAuth,(req,res)=>{

    console.log(req.body);
    const product = {
      productEmail : req.body.product.productEmail ,
      productName : req.body.product.productName,
      productPassword : req.body.product.productPassword
    }
    const productInstance = new userData(product);
    productInstance.save();
});

app.put('/update',checkAuth,(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods :GET,POST,PATCH,PUT,DELETE,OPTIONS')
    console.log(req.body);
    const product = {
      productEmail : req.body.product.productEmail ,
      productName : req.body.product.productName,
      productPassword : req.body.product.productPassword
    }
    userData.findByIdAndUpdate(req.body.pid,product)
    .then(()=>{
      console.log('product updated successfully');
      res.send(product);
    })
    .catch((err)=>{
      console.log('product updation failed:',err);
      res.send({error:err});
    })
})

app.delete('/delete/:uid',checkAuth,(req,res)=>{
  let uid=req.params.uid;
  ProductData.findByIdAndRemove(uid)
    .then(()=>{
        console.log('product deleted successfully');
        res.status(200).json({uid});

    })
    .catch((err)=>{
        console.log('product delete failed',err);
    })
})

app.get('/singleProduct/:pid',(req,res)=>{
  let pid=req.params.pid;
  console.log(pid,typeof pid,pid.length);
  ProductData.findById(pid)
  .then((product)=>{
    console.log('single product fetched',product);
    res.status(200).json({product});
  })
})

app.use('/user',userRouter);


// app serving in a perticular port
mongoose.connect(MONGODB_URI, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true ,useFindAndModify:false})
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`app serving at port  ${PORT}`);
    });
})
.catch((err)=>{
    console.log('failed to conncet to mongoDB atlas',err);
})
