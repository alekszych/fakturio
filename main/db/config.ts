import path from "path"
import {app} from "electron"

const config = {
	client: "sqlite3",
	connection: {
		filename: path.join(app.getPath("userData"), "./2i1u1ou2j.sqlite")
	},
	useNullAsDefault: true,
}

export default config