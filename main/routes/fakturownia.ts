import {Router} from "express"
import axios from "axios"
import {knex} from "../api"
import {AccountData} from "../../types"

const fakturowniaRouter = Router()

fakturowniaRouter.post("/invoice", async (req, res) => {
	try {
		const {data, account} = req.body
		const accountData = await knex.where("accountId", account.id).select().table("accountData")
		const accounts = await knex.where("id", account.id).select().table("account")
		const {
			name: sellerName,
			taxNo: sellerTaxNo,
			street: sellerStreet,
			postCode: sellerPostCode,
			city: sellerCity,
			country: sellerCountry,
			lumpSumTax: sellerLumpSumTax,
			vat: sellerVat,
			exemptTaxKind: sellerExemptTaxKind
		}: AccountData = accountData[0]
		const {fakturowniaToken, fakturowniaName} = accounts[0]

		let invoices = []
		for (const record of data) {
			const positions = record.products.map(product => {
				return {
					name: product.offer.name,
					total_price_gross: product.price.amount,
					quantity: product.quantity,
					"lump_sum_tax": sellerLumpSumTax,
					"tax": sellerVat
				}
			})

			positions.push({
				"name": "Koszty wysyłki",
				"total_price_gross": record.deliveryCost,
				"quantity": 1,
				"lump_sum_tax": sellerLumpSumTax,
				"tax": sellerVat
			})

			const currency = record.currency
			const {firstName: buyerFirstname, lastName: buyerLastname, street: buyerStreet, city: buyerCity, zipCode: buyerZipCode, countryCode: buyerCountryCode, company: buyerCompany} = record.invoice
			const invoice = {
				"kind": "vat",
				"seller_name": sellerName,
				"seller_tax_no": sellerTaxNo,
				"seller_street": sellerStreet,
				"seller_post_code": sellerPostCode,
				"seller_city": sellerCity,
				"seller_country": sellerCountry,
				"buyer_post_code": buyerZipCode,
				"buyer_city": buyerCity,
				"buyer_street": buyerStreet,
				"buyer_country": buyerCountryCode,
				"positions": positions,
				"currency": currency,
				"place": sellerCity
			}
			if (buyerFirstname) {
				invoice["buyer_first_name"] = buyerFirstname
				invoice["buyer_last_name"] = buyerLastname
			} else if (buyerCompany) {
				invoice["buyer_name"] = buyerCompany.name
				invoice["buyer_tax_no"] = buyerCompany.taxId
			}

			if (sellerVat.toLowerCase() == "zw"){
				invoice["exempt_tax_kind"] = sellerExemptTaxKind
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