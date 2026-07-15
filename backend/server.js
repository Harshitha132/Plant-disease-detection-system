const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const plantRoutes =
  require("./routes/plantRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(
  "/api/plants",
  plantRoutes
);

app.get("/", (req, res) => {
  res.send("LeafScan Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});