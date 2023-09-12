import {app} from "electron"
import serve from "electron-serve"
import api from "./api"
import {createWindow} from "./helpers"
const isProd = process.env.NODE_ENV === "production"
const server = api()

if (isProd) {
	serve({directory: "app"})
} else {
	app.setPath("userData", app.getPath("userData"))
}

(async () => {
	await app.whenReady()

	const mainWindow = createWindow("main", {
		width: 1300,
		height: 800,
		title: "Fakturio",
	})

	if (isProd) {
		await mainWindow.loadURL("app://./Home.html")
	} else {
		const port = process.argv[2]
		await mainWindow.loadURL(`http://localhost:${port}/Home`)
		mainWindow.webContents.openDevTools()
	}
})()

app.on("before-quit", () => {
	server.close()
})

app.on("window-all-closed", () => {
	app.quit()
})

