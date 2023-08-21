import createTableAccount from "../tables/account"
import createTableAccountData from "../tables/accountData"
import createTableInvoice from "../tables/invoice"

const createTables = () => {
	createTableAccount()
	createTableAccountData()
	createTableInvoice()
}

export default createTables