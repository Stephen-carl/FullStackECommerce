import express from 'express';
const app = express()
const port = 3000
import productRoutes from './route/products/index' 
import authRoutes from './route/auth/index'

app.use(express.json())
app.use('/products', productRoutes)
app.use('/auth', authRoutes)

const date = new Date()
console.log(`Today is ${date}`);


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})