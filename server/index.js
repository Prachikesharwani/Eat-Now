const express = require('express');
const cors = require('cors')
const mongoDB = require('./db')

const app = express();
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send("hello world");
});

app.use('/api',require('./Routes/CreateUser'))
app.use('/api',require('./Routes/DisplayData'))
app.use('/api',require('./Routes/OrderData'))

const port = 5000;
app.listen(port, async() => {
  console.log(`Example app listening on port ${port}`);
  await mongoDB(); 
});

