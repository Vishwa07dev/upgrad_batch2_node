/**
 * Starting point of the app
 */
const express = require("express")
const serverConfig = require("./configs/server.config")
const dbConfig = require("./configs/db.config")

mongoose.connect(dbConfig.DB_URL)

const db = mongoose.connection

db.on("error", () => {
  console.log("Error while connecting to the MongoDB server");
})

db.once("open", () => {
  console.log("Connected to the MongoDB");
})


const app = express()
app.use(express.json())

require("./routes/notifications.routes")(app)

app.listen(serverConfig.PORT, () => {
  console.log(`Listenting for request on ${serverConfig.PORT}`);
})
