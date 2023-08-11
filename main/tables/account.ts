import {knex} from "../api"

const createTableAccount = () => {
	 knex.schema.hasTable("account").then(function(exists) {
		 if (!exists) {
			 return knex.schema.createTable("account", (table) => {
				 table.increments("id").primary()
				 table.string("name")
				 table.string("allegroClientId")
				 table.string("allegroClientSecret")
				 table.string("fakturowniaName")
				 table.string("fakturowniaToken")
			 })
		 }
	 })
}


export default createTableAccount