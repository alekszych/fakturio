import path from "path"
import {app} from "electron"

const config = {
	client: "sqlite3",
	connection: {
		filename: path.join(app.getPath("userData"), "./bi24ri0292.sqlite")
	},
	useNullAsDefault: true,
}

export default config