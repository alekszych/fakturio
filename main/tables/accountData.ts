import {knex} from "../api"

const createTableAccountData = () => {
	knex.schema.hasTable("accountData").then(function(exists) {
		if (!exists) {
			return knex.schema.createTable("accountData", (table) => {
				table.increments("id").primary()
				table.integer("accountId")
				table.string("name")
				table.string("taxNo")
				table.string("street")
				table.string("postCode")
				table.string("city")
				table.string("country")
				table.string("lumpSumTax")
				table.string("vat")
			})
		}
	})
}

export default createTableAccountData
