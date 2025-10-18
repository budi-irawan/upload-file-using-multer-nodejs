const express = require('express')
const app = express()
const morgan = require('morgan')
const router = require('./router/documentFileRoute')
const port = 3001

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/document-file', router)
app.get('/', (req, res) => {
  res.send('Welcome to document api')
})

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`)
})
