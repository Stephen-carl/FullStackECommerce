import express from "express";
import authRoute from './routes/authRoute' 
import productRoute from './routes/productRoute'
import orderRoute from './routes/orderRoute'


const app = express();
const port  = 3000

app.use(express.json());
app.use('/auth', authRoute)
app.use('/product', productRoute)
app.use('/order', orderRoute)


const date = new Date()
console.log(`Today is ${date}`);


app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})