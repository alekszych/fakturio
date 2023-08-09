import {Router} from "express"
import axios from "axios"
import {knex} from "../api"

const fakturowniaRouter = Router()


fakturowniaRouter.post("/invoice", async (req, res) => {
	try {
		const {data, account} = req.body
		const accountData = await knex.where("accountId", account.id).select().table("accountData")
		const cleanAccountData = accountData[0]
		const accounts = await knex.where("id", account.id).select().table("account")
		const {fakturowniaToken, fakturowniaName} = accounts[0]
		let invoices = []

		for (const record of data) {
			const positions = record.products.map(product => {
				return {
					name: product.offer.name,
					total_price_gross: product.price.amount,
					quantity: product.quantity,
					"lump_sum_tax": cleanAccountData.lumpSumTax,
					"tax": cleanAccountData.vat
				}
			})

			positions.push({
				"name": "Koszty wysyłki",
				"total_price_gross": record.deliveryCost,
				"quantity": 1,
				"lump_sum_tax": cleanAccountData.lumpSumTax,
				"tax": cleanAccountData.vat
			})

			const currency = record.currency
			const {firstName, lastName, street, city, zipCode, countryCode, company} = record.invoice
			const invoice = {
				"kind": "vat",
				"seller_name": cleanAccountData.name,
				"seller_tax_no": cleanAccountData.taxNo,
				"seller_street": cleanAccountData.street,
				"seller_post_code": cleanAccountData.postCode,
				"seller_city": cleanAccountData.city,
				"seller_country": cleanAccountData.country,
				"buyer_post_code": zipCode,
				"buyer_city": city,
				"buyer_street": street,
				"buyer_country": countryCode,
				"positions": positions,
				"currency": currency
			}
			if (firstName) {
				invoice["buyer_first_name"] = firstName
				invoice["buyer_last_name"] = lastName
			} else if (company) {
				invoice["buyer_name"] = company.name
				invoice["buyer_tax_no"] = company.taxId
			}

			const response = await axios.post(`https://${fakturowniaName}.fakturownia.pl/invoices.json`, {
				"api_token": fakturowniaToken,
				"invoice": invoice
			},
			{
				headers: {"Content-Type": "application/json"}
			})

			invoices.push({
				id: record.id,
				file: `https://${fakturowniaName}.fakturownia.pl/invoices/${response.data.id}.pdf?api_token=${fakturowniaToken}`
			})
		}

		res.status(200).json(invoices)
	}
	catch (e) {
		res.json({error: e.message, errorMessage: "Błąd podczas tworzenia faktur"})
	}
})

export default fakturowniaRouter