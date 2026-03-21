const express = require("express");
const sequelize = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

require("./schema/Note");
app.use("/api/notes", noteRoutes);

const port = process.env.port;

sequelize.sync().then(() => {
  console.log("Database connected successfully");
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
