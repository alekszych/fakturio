import {knex} from "../api"

const createTableInvoice = () => {
	knex.schema.hasTable("invoice").then(function(exists) {
		if (!exists) {
			return knex.schema.createTable("invoice", (table) => {
				table.string("id").primary()
				table.enum("status", ["none", "local", "allegro"]).defaultTo("none").notNullable()
			})
		}
	})
}

export default createTableInvoice