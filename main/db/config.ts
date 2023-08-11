import path from "path"
import {app} from "electron"

const config = {
	client: "sqlite3",
	connection: {
		filename: path.join(app.getPath("userData"), "./fsi1b2oasd.sqlite")
	},
	useNullAsDefault: true,
}

export default config