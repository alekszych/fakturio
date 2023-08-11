import createTableAccount from "../tables/account"
import createTableAccountData from "../tables/accountData"

const createTables = () => {
	createTableAccount()
	createTableAccountData()
}

export default createTables