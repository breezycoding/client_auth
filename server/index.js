//Main starting point of the application
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");

//fix for deprecation warning
/* mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
 */
//DB setup
//mongoose.connect("mongodb://localhost:auth/auth", { useNewUrlParser: true });
mongoose.connect("mongodb://localhost/auth");


//App setup
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({type:"*/*"}));
router(app);

//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("server listening on port: ", port);