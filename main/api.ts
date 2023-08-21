import path from "path"

const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const appExpress = express()

import accountRouter from "./routes/account"
import allegroRouter from "./routes/allegro"
import fakturowniaRouter from "./routes/fakturownia"

import config from "./db/config"
import createTables from "./db/createTables"
import {app} from "electron"
import fs from "fs"

export const knex = require("knex")(config)
createTables()

fs.mkdir(path.join(app.getPath("userData"), "/invoices"), {recursive: true}, (err) => {
	if (err) console.log(err)
})

appExpress.use(bodyParser.json())
appExpress.use(cors({
	"origin": "*"
}))

appExpress.use("/account", accountRouter)
appExpress.use("/allegro", allegroRouter)
appExpress.use("/fakturownia", fakturowniaRouter)

export default function api(){
	return appExpress.listen(3010, () => {
		console.log("Server listening")
		// console.log("DB path: " + path.join(app.getPath("userData"), "./database.sqlite"))
	})
}