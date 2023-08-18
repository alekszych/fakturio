import {Account} from "../../../../types"
import React, {SetStateAction} from "react"

export interface AccountSelectProps{
	account: Account,
	setAccount: React.Dispatch<SetStateAction<Account>>
}
