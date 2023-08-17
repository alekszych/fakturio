import {Request, Response, Router} from "express"
import axios from "axios"
import base64 from "base-64"
import {knex} from "../api"
import {Account} from "../../types"

const allegroRouter = Router()

allegroRouter.get("/token", async (req: Request<{}, {}, {}, {account: Account, deviceCode: string}>, res: Response) => {
	try {
		const {account, deviceCode} = req.query
		const credentials = await knex.where("id", account.id).select().table("account")
		const {allegroClientId, allegroClientSecret} = credentials[0]
		const awaitCode = async () => {
			return await axios.post(`https://allegro.pl/auth/oauth/token?grant_type=urn:ietf:params:oauth:grant-type:device_code&device_code=${deviceCode}`, null, {
				headers: {
					"Authorization": `Basic ${base64.encode(`${allegroClientId}:${allegroClientSecret}`)}`,
				}
			})
		}
		const interval = setInterval(async () => {
			const {data} = await awaitCode()
			if ("access_token" in data) {
				clearInterval(interval)
				res.status(200).json(data)
			}
		}, 3000)
	}
	catch (e) {
		res.json({error: e.message, errorMessage: "Błąd podczas logowania"})
	}
})

allegroRouter.get("/login", async (req: Request<{}, {}, {}, {account: Account}>, res: Response) => {
	try {
		const {account} = req.query
		const accounts = await knex.where("id", account.id).select().table("account")
		const {allegroClientId, allegroClientSecret} = accounts[0]
		const {data} = await axios.post("https://allegro.pl/auth/oauth/device", null, {
			params: {
				client_id: allegroClientId
			},
			headers: {
				"Authorization": `Basic ${base64.encode(`${allegroClientId}:${allegroClientSecret}`)}`,
				"Content-Type": "application/x-www-form-urlencoded"
			}
		})
		res.json(data)
	}
	catch (e) {
		res.json({error: e.message, errorMessage: "Błąd podczas logowania"})
	}
})

allegroRouter.get("/offer", async (req: Request, res: Response) => {
	try {
		const {token} = req.query
		const {data} = await axios.get("https://api.allegro.pl/order/checkout-forms", {
			headers: {
				"Authorization": `Bearer ${token}`,
				"Accept": "application/vnd.allegro.public.v1+json"
			}
		})
		res.status(200).json(data)
	}
	catch (e) {
		res.json({error: e.message, errorMessage: "Błąd w pobieraniu ofert"})
	}
})

export default allegroRouter