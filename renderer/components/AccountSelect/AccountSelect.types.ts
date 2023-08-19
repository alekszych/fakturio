import React, {SetStateAction} from "react"
import {Account} from "../../../global-types"

export interface AccountSelectTypes {
	account: Account,
	setAccount: React.Dispatch<SetStateAction<Account>>
}
