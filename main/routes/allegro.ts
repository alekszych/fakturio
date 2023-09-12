import {Request, Response, Router} from "express"
import axios from "axios"
import base64 from "base-64"
import {knex} from "../api"
import {Account} from "../../global-types"
import fs from "fs"
import path from "path"
import {app} from "electron"

const allegroRouter = Router()

let allegroBaseUrl = "https://allegro.pl"
let allegroApiBaseUrl = "https://api.allegro.pl"
if(process.env.NODE_ENV !== "production"){
	allegroBaseUrl = "https://allegro.pl.allegrosandbox.pl"
	allegroApiBaseUrl = "https://api.allegro.pl.allegrosandbox.pl"
}


allegroRouter.get("/token", async (req: Request<{}, {}, {}, {account: Account, deviceCode: string}>, res: Response) => {
	try {
		const {account, deviceCode} = req.query
		const credentials = await knex.where("id", account.id).select().table("account")
		const {allegroClientId, allegroClientSecret} = credentials[0]
		const awaitCode = async () => {
			return await axios.post(`${allegroBaseUrl}/auth/oauth/token?grant_type=urn:ietf:params:oauth:grant-type:device_code&device_code=${deviceCode}`, null, {
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

allegroRouter.get("/login/:accountId", async (req: Request<{accountId: string}>, res: Response) => {
	try {
		const {accountId} = req.params
		const accounts = await knex.where("id", accountId).select().table("account")
		const {allegroClientId, allegroClientSecret} = accounts[0]
		const {data} = await axios.post(`${allegroBaseUrl}/auth/oauth/device`, null, {
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

allegroRouter.get("/offer", async (req: Request<{}, {}, {}, {token: string}>, res: Response) => {
	try {
		const {token} = req.query
		const {data} = await axios.get(`${allegroApiBaseUrl}/order/checkout-forms`, {
			headers: {
				"Authorization": `Bearer ${token}`,
				"Accept": "application/vnd.allegro.public.v1+json"
			}
		})

		const dataWithInvoices = []

		const invoices = await knex.select().from("invoice")
		for (const item of data.checkoutForms) {
			let status = "none"
			const DbInvoice = invoices.find(invoice => invoice.id === item.id)
			if(DbInvoice){
				status = DbInvoice.status
			}
			if((DbInvoice && DbInvoice.status !== "allegro") || !DbInvoice){
				const {data: invoiceData} = await axios.get(`${allegroApiBaseUrl}/order/checkout-forms/${item.id}/invoices`, {
					headers: {
						"Accept": "application/vnd.allegro.public.v1+json",
						"Authorization": `Bearer ${token}`
					}
				})
				if(invoiceData.invoices.length !== 0){
					status = "allegro"
				}
			}
			const newItem = {...item, status: status}
			await knex("invoice").where("id", item.id).del()
			await knex("invoice").insert({id: item.id, status: status})
			dataWithInvoices.push(newItem)
		}
		res.status(200).json(dataWithInvoices)
	}
	catch (e) {
		res.json({error: e.message, errorMessage: "Błąd w pobieraniu ofert"})
	}
})

allegroRouter.post("/invoice", async (req: Request<{}, {}, {token: string, invoice: string}>, res: Response) => {
	try {
		const {token, invoice} = req.body
		
		const {data: preInvoiceData} = await axios.post(
			`${allegroApiBaseUrl}/order/checkout-forms/${invoice}/invoices`,
			{file: {
				name: `${invoice}.pdf`,
			}},
			{headers: {
				Accept: "application/vnd.allegro.public.v1+json",
				"Content-Type": "application/vnd.allegro.public.v1+json",
				Authorization: `Bearer ${token}`,
			}})

		await axios.put(
			`${allegroApiBaseUrl}/order/checkout-forms/${invoice}/invoices/${preInvoiceData.id}/file`,
			fs.readFileSync(path.join(app.getPath("userData") + `/invoices/${invoice}.pdf`)),
			{headers: {
				"Accept": "application/vnd.allegro.public.v1+json",
				"Content-Type": "application/pdf",
				"Authorization": `Bearer ${token}`
			}})

		res.json({message: "Faktura została dodana do zamówienia"})
	}
	catch (e) {
		res.json({error: e.message, errorMessage: "Błąd w pobieraniu ofert"})
	}
})

export default allegroRouter