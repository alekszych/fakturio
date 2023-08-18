import {Account} from "../../../../types"
import React, {SetStateAction} from "react"

export interface AccountSelectTypes {
	account: Account,
	setAccount: React.Dispatch<SetStateAction<Account>>
}
