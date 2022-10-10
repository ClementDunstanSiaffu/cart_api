
require("./model/db")
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const Routes = require("./routes")

app.use(express.json());
app.use(express.urlencoded());

Routes.getCartsRoutes(app);

app.listen(PORT);

