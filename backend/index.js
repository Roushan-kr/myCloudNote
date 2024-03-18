const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "auth-token"],
  optionsSuccessStatus: 204
};

const app = express();
const port = process.env.PORT || 5000;
app.use(cors(corsOptions));
app.use(express.json());

// Abhilable routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/Notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.send("we are woking for mycloud website");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
