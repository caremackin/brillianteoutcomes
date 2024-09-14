const express = require("express");
const { Sequelize } = require("sequelize");
const userRoutes = require("./routes/user-routes");
const PORT = 4000;
const app = express();
const sequelize = new Sequelize("bo_project_db", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(`Error connecting to database: ${err}`);
  });

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request from url: ${req.url}`);
  next();
});

app.use("/", userRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
  })
  .catch((err) => {
    console.log(`Unable to connect: ${err}`);
  });
