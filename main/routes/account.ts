import {Router} from "express"
import {knex} from "../api"
import {Account, AccountData} from "../../global-types"
import {Request, Response} from "express"
const accountRouter = Router()

accountRouter.get("/", async (req: Request, res: Response) => {
	try {
		const data = await knex.select("id", "name").table("account")
		res.status(200).json(data)
	}
	catch (e) {
		res.json({error: e.message, errorMessage: "Błąd w pobieraniu kont"})
	}
})

accountRouter.post("/", async (req: Request, res: Response) => {
	try {
		const {allegroClientId, allegroClientSecret, fakturowniaToken, fakturowniaName, name} = req.body
		const data: Account = {
			name: name,
			allegroClientId: allegroClientId,
			allegroClientSecret: allegroClientSecret,
			fakturowniaName: fakturowniaName,
			fakturowniaToken: fakturowniaToken
		}
		await knex("account").insert(data)
		res.status(200).json({message: "Dane logowania zostały zmienione"})
	}
	catch (e) {
		res.json({error: e.message, errorMessage: "Błąd w dodawaniu konta"})
	}
})

accountRouter.delete("/:accountId", async (req: Request<{accountId: string}>, res: Response) => {
	try {
		const {accountId} = req.params
		await knex("accountData").where("accountId", accountId).del()
		await knex("account").where("id", accountId).del()
		res.status(200).json({message: "Dane logowania zostały zmienione"})
	}
	catch (e) {
		res.json({error: e.message, errorMessage: "Błąd w usuwaniu konta"})
	}
})

accountRouter.post("/data", async (req: Request, res: Response) => {
	try {
		const {accountId, name, taxNo, street, postCode, city, country, lumpSumTax, vat, exemptTaxKind} = req.body
		await knex("accountData").where("accountId", accountId).del()
		const data: AccountData = {
			accountId: accountId,
			name: name,
			taxNo: taxNo,
			street: street,
			postCode: postCode,
			city: city,
			country: country,
			lumpSumTax: lumpSumTax,
			vat: vat,
		}
		if(vat.toLowerCase() == "zw"){
			data.exemptTaxKind = exemptTaxKind
		}
		await knex("accountData").insert(data)
		res.status(200).json({message: "Dane zostały zmienione"})
	}
	catch (e) {
		res.json({error: e.message, errorMessage: "Błąd w zmienianiu danych konta"})
	}
})

accountRouter.get("/data/:accountId", async (req: Request<{accountId: string}>, res: Response) => {
	try {
		const {accountId} = req.params
		const data = await knex.where("accountId", accountId).select().table("accountData")
		res.status(200).json(data)
	}
	catch (e) {
		res.json({error: e.message, errorMessage: "Błąd w pobieraniu danych konta"})
	}
})

export default accountRouter