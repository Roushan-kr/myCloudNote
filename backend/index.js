const connectToMongo = require("./db")
const express = require('express')

connectToMongo();

const app = express()
const port = process.env.PORT || 5000;
app.use(express.json())
// Abhilable routes 
app.use("/api/v1/auth",require("./routes/auth"))
app.use("/api/v1/createNotes",require("./routes/notes"))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
